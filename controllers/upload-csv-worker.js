'use strict'

const workerPool = require('workerpool');
const path = require('path');

let poolProxy = null;

const init = async (options) => {
    const pool = workerPool.pool(path.join(__dirname, './thread-function.js'), options);
    poolProxy = await pool.proxy;
    console.log(`Worker Threads Enabled - Min Workers: ${pool.minWorkers} - Max Workers: ${pool.maxWorkers} - Worker Type: ${pool.workerType}`);
}

const get = () => {
    return poolProxy
}

exports.init = init
exports.get = get