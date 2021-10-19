'use strict'

const WorkerPool = require('workerpool')
const Utilities = require('./upload-csv-logic')

const uploadCsv = (file) => {
    return Utilities.uploadCsv(file);
}

WorkerPool.worker({
    uploadCsv
})