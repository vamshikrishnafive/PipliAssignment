'use strict'

const WorkerPool = require('workerpool')
const Utilities = require('./upload-csv')

const uploadCsvSync = (file) => {
    return Utilities.uploadCsvSync(file);
}

WorkerPool.worker({
    uploadCsvSync
})