'use strict'

const WorkerPool = require('workerpool')
const Utilities = require('./upload-csv-logic')

const uploadCsv = (file) => {
    return Utilities.uploadCsvSync(file);
}

WorkerPool.worker({
    uploadCsv()
})