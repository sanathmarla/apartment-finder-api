#! /bin/bash

export APP_MONGO_DB_CONNECTION=mongodb://mongoadmin:mongolab123@ds137891.mlab.com:37891/aptfinder
export APP_LOG_DIRECTORY=logs
export NODE_ENV=development
export APP_PORT=3050

npm start