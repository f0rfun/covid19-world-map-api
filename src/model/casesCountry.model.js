const mongoose = require("mongoose");

const casesCountrySchema = new mongoose.Schema({
  Country_Region: {
    type: String,
    required: true,
    unique: true,
  },
  Last_Update: {
    type: String,
    required: true,
  },
  Lat: {
    type: String,
    required: true,
  },
  Long_: {
    type: String,
    required: true,
  },
  Confirmed: {
    type: String,
    required: true,
  },
  Deaths: {
    type: String,
    required: true,
  },
  Recovered: {
    type: String,
    required: true,
  },
  Active: {
    type: String,
    required: true,
  },
  Incident_Rate: {
    type: String,
    required: true,
  },
  People_Tested: {
    type: String,
    required: true,
  },
  People_Hospitalized: {
    type: String,
    required: true,
  },
  Mortality_Rate: {
    type: String,
    required: true,
  },
  UID: {
    type: String,
    required: true,
  },
  ISO3: {
    type: String,
    required: true,
  },
});

const CasesCountry = mongoose.model("cases_country", casesCountrySchema);

module.exports = CasesCountry;
