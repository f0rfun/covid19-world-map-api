const express = require("express");
const app = express();
const cors = require("cors");
require("./src/utils/db");

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
};

app.get("/", (req, res) => {
  res.status(200);
  res.send("COVID19 World Map API");
});

app.use((err, req, res) => {
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
