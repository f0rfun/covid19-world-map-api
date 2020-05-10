const ConfirmedTimeSeries = require("../model/confirmedTimeSeries.model");

const addNewConfirmedTimeSeries = async (req, res, next) => {
  try {
    const record = new ConfirmedTimeSeries(req.body);
    const newRecord = await record.save();

    const { _id, __v, ...strippedRecord } = newRecord.toObject();
    res.json(strippedRecord);
  } catch (err) {
    next(err);
  }
};

const updateConfirmedTimeSeries = async (req, res, next) => {
  try {
    var newRecord = { date: req.body.date, count: req.body.count };
    console.log(newRecord);
    var latLong = { lat: req.body.lat, long: req.body.long };
    console.log(latLong);
    ConfirmedTimeSeries.findOneAndUpdate(
      latLong,
      {
        $push: { records: newRecord },
      },
      { new: true },
      (err, doc) => {
        if (err) {
          next(err);
        }

        res.json(doc);
      }
    );
  } catch (err) {
    next(err);
  }
};

const getAllConfirmedTimeSeries = async (req, res, next) => {
  res.status(200);
  const allConfirmedCases = await ConfirmedTimeSeries.find();
  const { _id, __v, ...strippedRecord } = allConfirmedCases;
  res.json(strippedRecord);
};

// const addConfirmedTimeSeries = async (req, res) => {
//   const newConfirmedTimeSeries = {
//     province_state: req.body.province_state,
//     country_region: req.body.country_region,
//     lat: req.body.lat,
//     long: req.body.long,
//     records: [
//       {
//         date: req.body.date,
//         count: req.body.count,
//       },
//     ],
//   };
//   const record = new ConfirmedTimeSeries(newConfirmedTimeSeries);
//   record.save();
//   res.status(200);
//   res.send("success!");
// };

module.exports = {
  addNewConfirmedTimeSeries,
  updateConfirmedTimeSeries,
  getAllConfirmedTimeSeries,
};
