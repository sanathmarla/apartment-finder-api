'use strict';

const dbClient = require('mongoose');
const config = require('./config.js');

var db = {
    conn: null
};

module.exports = {
    connect: connect,
    get: get
}

function connect(url) {
    return new Promise((resolve, reject) => {
        db.conn = dbClient.connect(url);
        resolve(db.conn);
    });
}

function get() {
    return db.conn;
}
