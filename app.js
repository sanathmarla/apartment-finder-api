'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config')();
const logger = require('./logger');
const db = require('./db.js');

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

        //TO-DO @Bhandary: Put this into a Controller/Router of some sort
        app.get('/health', function(req, res) {
            var dbState = db.get().connection.readyState;

            switch (dbState) {
                case 0:
                    res.status(500).json({db_status: 'Disconnected'});
                    break;
                case 1:
                    res.status(200).json({db_status: 'Connected'});
                    break;
                case 2:
                    res.status(500).json({db_status: 'Connecting'});
                    break;
                case 3:
                    res.status(500).json({db_status: 'Disconnecting'});
                    break;
                default:
                    res.status(500).json({db_status: 'UnknownState'});

            }
        });

        app.listen(PORT);
        logger.debug('Running web server on http://localhost:' + PORT);
    })
    .catch(err => {
        logger.error('Failed to connect to db ' + config.DB_PATH);
        logger.error(err);
    });
