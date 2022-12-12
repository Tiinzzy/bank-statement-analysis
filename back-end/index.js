const express = require("express");
const dataServices = require("data-services.js");

const PORT = process.env.PORT || 8888;

const app = express();

app.listen(PORT, () => {
  app.post("/save-csv-file", (req, res) => {
    console.log('Saving CSV File');
    res.json(dataServices.saveCsvFile(req));
  })
});