const CasesCountry = require("../model/casesCountry.model");

const getAll = async (req, res, next) => {
  res.status(200);
  const results = await CasesCountry.find();
  res.send(results);
};

module.exports = { getAll };
