const csv = require("csv-parser");
const fs = require("fs");
const model = require("../models/policy.js");

const uploadCsv = (file) => {
    fs.createReadStream(file.path) 
        .pipe(csv())
        .on("data", (data) => {
            model.insertMany({...data})
            .catch(err => console.error(err) )
        })
        .on("end", () => { fs.unlinkSync(file.path) })
    return ({ fileUrl: `http://192.168.0.7:3000/CSV/${file.filename}` });
};

exports.uploadCsv = uploadCsv

