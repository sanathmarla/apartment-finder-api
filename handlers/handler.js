'use strict';

module.exports = {
    healthCheck : healthCheck
};

function healthCheck(db) {
    return function(req, res) {
        var dbState = db.connection.readyState;

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
    }
}