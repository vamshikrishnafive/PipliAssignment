const express = require('express');
require('dotenv').config();
const multer = require("multer");
const app = express();
require("dotenv").config()

const workerCon = require("./controllers/upload-csv-worker")
const Utilities = require('./controllers/upload-csv');
let storage = require('./controllers/multer_storage.js')

app.use(express.json());

const upload = multer({ storage: storage });

app.get('/', (req, res) => { res.send("Hello World") })
app.post('/upload-csv', upload.single('file'), async (req, res) => {
    let file = req.file;
    let result;
    let workerPool = null;
    if (process.env.WORKER_POOL_ENABLED === '1') {
        workerPool = workerCon.get();
        result = await workerPool.uploadCsvSync(file);
    } else {
        result = await Utilities.uploadCsvSync(file);
    }
    res.status(201).json(result);
});
app.use("*", (req, res) => res.send({ error: "page not found" }));

(async () => {
    if (process.env.WORKER_POOL_ENABLED === "1") {
        const options = { minWorkers: 'max' }
        await workerCon.init(options);
    }
    const port = 3000;
    app.listen(port, () => console.log(`app listening on port ${port}`))
})();

