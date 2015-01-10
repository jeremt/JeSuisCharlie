
var db = require('./db');

db.connect(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }
    db.init(connection, function (err) {
        if (err) {
            if (err.code === 'ER_TABLE_EXISTS_ERROR') {
                console.log('Already initialized.');
            }
            console.error(err);
            return;
        }
        console.log("Database initialize successfuly.");
    });
});
