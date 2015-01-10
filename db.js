var mysql      = require('mysql');
var fs         = require('fs');
var cfg        = require('./mysql_config.json');

/**
 * Create the photo table.
 * @param connection
 * @param callback
 */
exports.init = function (connection, callback) {
    connection.query("CREATE TABLE jesuischarlie.photos (id INT AUTO_INCREMENT, filename VARCHAR(50), PRIMARY KEY(id))", callback);
};

/**
 * Reset the photos' database from images in the server.
 * @param callback
 */
exports.reset = function (connection, callback) {
    connection.query("DROP TABLE jesuischarlie.photos", function (err) {
        if (err) {
            callback(err);
            return;
        }

        exports.init(connection, function (err) {
            if (err) {
                callback(err);
                return;
            }
            fs.readdir(__dirname + "/public/images", function (err, result) {
                if (err) {
                    callback(err);
                    return;
                }
                if (result.length) {
                    result = result.map(function (row) {return '("' + row + '")'}).join(", ");
                    connection.query("INSERT INTO jesuischarlie.photos (filename) VALUES " + result, callback);
                }
                else {
                    callback();
                }
            });
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
    connection.query("INSERT INTO jesuischarlie.photos (filename) VALUES ('" + filename + "')", callback);
};

/**
 * Remove a photo from its name.
 * @param connection
 * @param filename
 * @param callback
 */
exports.removePhoto = function (connection, filename, callback) {
    connection.query("DELETE FROM jesuischarlie.photos WHERE filename = '" + filename + "'", callback);
};

/**
 * Get photos within the given range.
 * @param connection
 * @param from
 * @param to
 * @param callback
 */
exports.getPhotos = function (connection, from, to, callback) {
    connection.query("SELECT * FROM jesuischarlie.photos WHERE id BETWEEN " + from + " AND " + to, callback);
};

/**
 * Connect to the database.
 * @param callback
 */
exports.connect = function (callback) {
    var connection = mysql.createConnection({
        host     : cfg.host,
        user     : cfg.user,
        password : cfg.password
    });
    connection.connect(function (err) {
        callback(err, connection);
    });
};