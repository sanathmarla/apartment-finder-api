/*eslint-env node */
'use strict';

/**
 * Handles any sort of configuration from environment variables depending on the
 * environment (testing, development or production)
 *
 * @return {Object} Singleton configuration
 */
module.exports = function() {
    switch (process.env.NODE_ENV) {
    case 'testing':
        return {
            ENV: 'testing',
            APP_PORT: process.env.APP_PORT || 3000,
            DB_PATH: 'mongodb://edlio.test/pages'
        };
    case 'development':
        return {
            ENV: 'development',
            APP_PORT: process.env.APP_PORT || 3000,
            DB_PATH: process.env.APP_MONGO_DB_CONNECTION,
            LOG_DIRECTORY: process.env.APP_LOG_DIRECTORY
        };
    case 'production':
        return {
            ENV: 'production',
            APP_PORT: process.env.APP_PORT || 3000,
            DB_PATH: process.env.APP_MONGO_DB_CONNECTION,
            LOG_DIRECTORY: process.env.APP_LOG_DIRECTORY
        };
    default:
        throw new Error('Please set up NODE_ENV under environment variable');
    }
};