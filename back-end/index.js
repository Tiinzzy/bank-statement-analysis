const express = require("express");
const dataServices = require("./data-services.js");

const PORT = process.env.PORT || 8888;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);

  app.post("/save-csv-file", (req, res) => {
    console.log('Saving CSV File');
    res.json(dataServices.saveCsvFile(req));
  })

  app.post("/set-categories-for-csv-file", (req, res) => {
    console.log('Setting Categories for CSV File');
    res.json(dataServices.setNewCategories(req));
  })

  app.get("/send-the-saved-csv-file", (req, res) => {
    console.log('Sending CSV File');
    res.json(dataServices.getCsvFileData(req));
  })

});


