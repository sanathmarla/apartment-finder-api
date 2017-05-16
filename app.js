'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config')();
const logger = require('./logger');
const db = require('./db_mongo.js');

const PORT = config.APP_PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

db.connect(config.DB_PATH)
    .then(() => {
        logger.info('Successfully connect to Mongo DB ' + config.DB_PATH);
        /**
         * Simple hello world to make sure express is working
         */
        app.get('/health', function(req, res) {
            db.get().runCommand({ping:1}, (err, result) => {
                if (err) {
                    res.status(503).send('Failed to ping Mongo DB');
                    return;
                }
                if (result.ok) {
                    res.status(200).json({alive: true});
                } else {
                    res.status(503).send({alive: false});
                }
            });
        });

        app.listen(PORT);
        logger.debug('Running web server on http://localhost:' + PORT);
    })
    .catch(err => {
        logger.error('Failed to connect to db ' + config.DB_PATH);
        logger.error(err);
    });
