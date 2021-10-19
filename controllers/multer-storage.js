const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./tmp/csv/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        let filetype = ''
        if (file.mimetype === 'text/csv') {
            filetype = 'csv';
        }
        cb(null, `csv-${Date.now()}.${filetype}`);
    }
});

module.exports = storage;