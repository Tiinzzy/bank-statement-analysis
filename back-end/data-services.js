const JSONdb = require('simple-json-db');
const db = new JSONdb('./data.json');

exports.saveCsvFile = (req) => {
    let data = req.query.data;

    if (typeof data === "object") {
        if (!Array.isArray(data)) {
            data = Object.values(data);
        }
        let dbData = {};
        data.forEach(d => {
            dbData[d.id] = d;
        })
        db.JSON(dbData);
        db.sync();
        return { success: true }
    } else {
        return { success: false }
    }
}

exports.setNewCategories = (req) => {
    let query = req.query.query;
    console.log(query);

    var ids = query.id;
    var category = query.CATEGORY;

    if (typeof ids === "string") {
        ids = [ids];
    }


    if (typeof category === 'string' && category !== 'None') {
        let jData = db.JSON();
        ids.map(e => jData[e]).forEach(e => {
            e.category = category;
            db.set(e.id, e);
            console.log(e);
        });
        db.sync();
        return { success: true }
    } else {
        return { success: false }
    }
}

exports.getCsvFileData = () => {
    let dbData = db.JSON();
    let data = []
    for(let i in dbData){
        data.push(dbData[i]);
    }
    return data;
}