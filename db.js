var fs         = require('fs');
var sqlite3    = require("sqlite3").verbose();

/**
 * Create the photo table.
 * @param connection
 * @param callback
 */
exports.init = function (connection, callback) {
    connection.run("CREATE TABLE photos (ID INTEGER PRIMARY KEY AUTOINCREMENT, filename VARCHAR(50))");
    callback();
};

/**
 * Reset the photos' database from images in the server.
 * @param callback
 */
exports.reset = function (connection, callback) {
    connection.run("DROP TABLE photos");
    exports.init(connection, function () {
        fs.readdir(__dirname + "/public/images", function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            if (result.length) {
                result = result.map(function (row) {
                    return '("' + row + '")'
                }).join(", ");
                connection.run("INSERT INTO photos (filename) VALUES " + result);
            }
            callback();
        });
    });
};

/**
 * Add a photo from its name.
 * @param connection
 * @param filename
 * @param callback
 */
exports.addPhoto = function (connection, filename, callback) {
    connection.run("INSERT INTO photos (filename) VALUES ('" + filename + "')");
    callback();
};

/**
 * Remove a photo from its name.
 * @param connection
 * @param filename
 * @param callback
 */
exports.removePhoto = function (connection, filename, callback) {
    connection.run("DELETE FROM photos WHERE filename = '" + filename + "'");
    callback();
};

/**
 * Get photos within the given range.
 * @param connection
 * @param from
 * @param to
 * @param callback
 */
exports.getPhotos = function (connection, from, to, callback) {
    connection.all("SELECT * FROM photos WHERE id BETWEEN " + from + " AND " + to, callback);
};

/**
 * Connect to the database.
 * @param callback
 */
exports.connect = function (callback) {
    var file = __dirname + "/jesuischarlie.db";
    if(!fs.existsSync(file)) {
        fs.openSync(file, "w");
    }
    var db = new sqlite3.Database(file);
    db.serialize(function() {
        callback(null, db);
    });
};
