const mongoose = require("mongoose");

const confirmedTimeSeriesSchema = new mongoose.Schema(
  {
    province_state: {
      type: String,
      required: false,
      unique: false,
    },
    country_region: {
      type: String,
      required: false,
      unique: false,
    },
    lat: {
      type: String,
      required: true,
    },
    long: {
      type: String,
      required: true,
    },
    records: [
      {
        date: { type: String, required: true }, // or Date if you want to do aggregations with the date else have to convert string to a date object
        count: Number,
      },
    ],
  },
  { collection: "confirmedTimeSeries" }
);

confirmedTimeSeriesSchema.index(
  { lat: 1, long: 1, "records.date": 1 },
  { unique: true }
);

const ConfirmedTimeSeries = mongoose.model(
  "ConfirmedTimeSeries",
  confirmedTimeSeriesSchema
);

module.exports = ConfirmedTimeSeries;
