const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const { getAll } = require("../controller/casesCountry.controller");

router.get("/", getAll);

module.exports = router;
