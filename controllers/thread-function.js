'use strict'

const WorkerPool = require('workerpool')
const Utilities = require('./upload-csv')

const uploadCsv = (file) => {
    return Utilities.uploadCsvSync(file);
}

WorkerPool.worker({
    uploadCsv
})