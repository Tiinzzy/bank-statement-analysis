const express = require("express");
const dataServices = require("./data-services.js");

const PORT = process.env.PORT || 8888;
const STATIC_ROOT = process.env.STATIC_ROOT;

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  console.log('Static Folder: ', STATIC_ROOT)

  app.use('/', express.static(STATIC_ROOT))

  app.post("/backend/save-csv-file", (req, res) => {
    console.log('Saving CSV File');
    res.json(dataServices.saveCsvFile(req));
  })

  app.post("/backend/set-categories-for-csv-file", (req, res) => {
    console.log('Setting Categories for CSV File');
    res.json(dataServices.setNewCategories(req));
  })

  app.get("/backend/send-the-saved-csv-file", (req, res) => {
    console.log('Sending CSV File');
    res.json(dataServices.getCsvFileData(req));
  })

  app.get("/backend/bank-statement/test", (req, res) => {
    console.log('coming from proxy :)');
    res.json({ 'result': 'fantastic bank!' });
  })

});


