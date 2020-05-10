const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const {
  addNewConfirmedTimeSeries,
  updateConfirmedTimeSeries,
  getAllConfirmedTimeSeries,
} = require("../controller/confirmedTimeSeries.controller");

router.get("/find", getAllConfirmedTimeSeries);

router.post("/add", addNewConfirmedTimeSeries);

router.post("/update", updateConfirmedTimeSeries);

module.exports = router;
