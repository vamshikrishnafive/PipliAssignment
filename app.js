require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const http = require('https')

const workerCon = require("./controllers/upload-csv-worker")
const Utilities = require('./controllers/upload-csv-logic');
const policy = require('./models/policy');

const app = express();
app.use(express.json());

app.get('/', (req, res) => { res.send("Hello World") })
app.post('/upload-csv', async (req, res) => {
    let file = req.file;
    let result;
    let workerpool = workerCon.get();
    result = await workerpool.uploadCsv(file);
    res.status(201).json(result);
});
app.get('/get-policy-details', async (req, res) => {
    try {
        let userName = req.query.userName;
        let result = await policy.findOne({ userName });
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(400).json({ Error: "NotFound" })
    }
});
app.get('/get-all', async (req, res) => {
    try {
        let userName = req.query.userName;
        let result = await policy.find();
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(400).json({ Error: "NotFound" })
    }
})
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

