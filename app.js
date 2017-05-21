'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config')();
const logger = require('./logger');
const db = require('./db.js');
const handlers = require('./handlers/handler.js');

const PORT = config.APP_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

db.connect(config.DB_PATH)
    .then(() => {
        logger.info('Successfully connect to Mongo DB ' + config.DB_PATH);

        /**
         * Express Handler For Handling Health Check Request
         */
        app.get('/health', handlers.healthCheck(db.get()));

        app.listen(PORT);
        logger.debug('Running web server on http://localhost:' + PORT);
    })
    .catch(err => {
        logger.error('Failed to connect to db ' + config.DB_PATH);
        logger.error(err);
    });
