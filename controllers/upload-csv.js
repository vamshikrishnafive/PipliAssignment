const csv = require("fast-csv");
const fs = require("fs");

const uploadCsv = (file) => {
    const fileRows = [];
    csv.parseFile(file.path)
    .on("data", function (data) { fileRows.push(data); })
    .on("end", function () { fs.unlinkSync(file.path) })
    return ({fileUrl: `http://192.168.0.7:3000/CSV/${file.filename}` });
};

exports.uploadCsvSync = uploadCsv

