var fs = require("fs");
const path = "./src/data/time_series_covid19_confirmed_global.csv";
const ConfirmedTimeSeries = require("../model/confirmedTimeSeries.model");
const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true, // prevent deprecation warnings
  useUnifiedTopology: true,
  useFindAndModify: false, // For find one and update
  useCreateIndex: true, // for creating index with unique
};

const dbName = "covid19";
const dbUrl = "mongodb://localhost:27017/" + dbName;
mongoose.connect(dbUrl, mongoOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`connected to mongodb at ${dbUrl}`);
});

fs.readFile(path, (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let arr = data.toString().trim().split("\n");
  arr = arr.map((aLine) => aLine.trim());
  arr = arr.map((aLine) => aLine.split(",").map((aValue) => aValue.trim()));

  //const countries = addCountry(arr);
  //console.log(countries.length); //262 remaining
  //insertCountries(countries);

  const datesAndCaseCount = getDatesAndCaseCount(arr);
  const confirmedTimeSeries = getConfirmedTimeSeries(arr, datesAndCaseCount);
  upsertConfirmedTimeSeries(confirmedTimeSeries);
});

getDatesAndCaseCount = (arr) => {
  const header = arr.slice(0, 1);
  const countries = arr.slice(1);
  const datesArr = header[0].slice(4);

  return countries.map((aCountryObject) => {
    let recordsArr = [];

    datesArr.map((aDate, index) => {
      let aRecordObject = {};
      aRecordObject.date = aDate;
      aRecordObject.count = aCountryObject.slice(4)[index];
      recordsArr.push(aRecordObject);
    });
    return recordsArr;
  });
};

getConfirmedTimeSeries = (arr, datesAndCaseCount) => {
  const countries = arr.slice(1);
  return countries.map((aLine, index) => {
    let aCountry = {};

    aCountry.lat = aLine[2];
    aCountry.long = aLine[3];
    aCountry.records = datesAndCaseCount[index];

    return aCountry;
  });
};

addCountry = (arr) => {
  const countries = arr.slice(1);
  return countries.map((aLine, index) => {
    let aCountry = {};

    aCountry.province_state = aLine[0];
    aCountry.country_region = aLine[1];
    aCountry.lat = aLine[2];
    aCountry.long = aLine[3];

    return aCountry;
  });
};

insertCountries = (countries) => {
  try {
    countries.forEach(async (aCountry) => {
      const aCountryRecord = new ConfirmedTimeSeries(aCountry);
      const doc = await aCountryRecord.save();
    });
  } catch (err) {
    console.log(err.message);
  }
};

upsertConfirmedTimeSeries = (records) => {
  try {
    records.forEach(async (aRecord) => {
      let latLong = { lat: aRecord.lat, long: aRecord.long };

      ConfirmedTimeSeries.findOneAndUpdate(
        latLong,
        { $push: { records: aRecord.records } },
        { new: true },
        (err, doc) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  } catch (err) {
    console.log(err.message);
  }
};
