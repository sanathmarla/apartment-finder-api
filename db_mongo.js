'use strict';

const mongojs = require('mongojs');
const config = require('./config.js');

var mongoDb = {
    conn: null
};

module.exports = {
    connect: connect,
    get: get
}

function connect(url) {
    return new Promise((resolve, reject) => {
        mongoDb.conn = mongojs(
            url
        );
        resolve(mongoDb.conn);
    });
}

function get() {
    return mongoDb.conn;
}
