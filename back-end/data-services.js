const JSONdb = require('simple-json-db');
const db = new JSONdb('./data.json');

exports.saveCsvFile = (req) => {
    let data = req.query.data;

    if (typeof data === "object") {
        db.JSON(data);
        db.sync();
        return { success: true }
    } else {
        return { success: false }
    }
}