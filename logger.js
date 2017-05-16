/*eslint-env node */
'use strict';

var winston = require('winston');
const config = require('./config')();

var transports = [];

// In testing, we don't need to log to file
if (config.ENV !== 'testing') {
    transports.push(
        new (require('winston-daily-rotate-file'))({
            dirname: config.LOG_DIRECTORY,
            handleExceptions: true,
            timestamp: true,
            zippedArchive: true,
            filename: 'apt-finder-api',
            datePattern: '.yyyy-MM-dd_HH.log',
            logstash: true
        })
    );
}

transports.push(new(winston.transports.Console)({
    colorize: true,
    handleExceptions: true,
    level: 'debug'
}));

module.exports = new(winston.Logger)({
    exitOnError: false,
    transports: transports
});