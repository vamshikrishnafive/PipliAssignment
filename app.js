const express = require('express');
require('dotenv').config();
const multer = require("multer");
require("dotenv").config()
const mongoose = require('mongoose')


const workerCon = require("./controllers/upload-csv-worker")
const Utilities = require('./controllers/upload-csv-logic');
let storage = require('./controllers/multer-storage.js')

const app = express();
app.use(express.json());
const upload = multer({ storage: storage });

app.get('/', (req, res) => { res.send("Hello World") })
app.post('/upload-csv', upload.single('file'), async (req, res) => {
    let file = req.file;
    let result;
    result = await Utilities.uploadCsv(file);
    res.status(201).json(result);
});
app.use("*", (req, res) => res.send({ error: "page not found" }));

(async () => {
    if (process.env.WORKER_POOL_ENABLED === "1") {
        const options = { minWorkers: 'max' }
        await workerCon.init(options);
    }
    const port = 3000;
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('connected to DB'))
        .then(app.listen(port, () => console.log(`app listening on port ${port}`)))
})();

