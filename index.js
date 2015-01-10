var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var db = require('./db');

var app = express();
var imageFolder = __dirname + "/public/images";

var config = {
    url: 'http://www.jesuischarlie.photo',
    title: 'JeSuisCharlie',
    summary: fs.readFileSync(__dirname + '/description.txt').toString().replace(/\n/g, "\\n"),
    tweet: 'TODO'
};


if(!fs.existsSync(imageFolder)){
    fs.mkdirSync(imageFolder, 0766, function(err){
        if(err){
            console.log(err);
            response.send("ERROR! Can't make the images directory!\n");
        }
    });
}
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').json({limit: '50mb'}));

db.connect(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }

    db.reset(connection, function (err) {
        if (err) {
            console.log("Cannot reset DB, ensure you run node init_db.js before.");
            console.log(err);
            return;
        }
        app.get('/', function(request, response) {
            response.render('index.html');
        });

        app.get('/gallery', function(request, response) {
            response.render('gallery.html');
        });

        app.get('/images/:from/:to', function (request, response) {
            db.getPhotos(connection, request.params.from, request.params.to, function (err, result) {
                if (err) {
                    console.error(err);
                    return;
                }
                response.send(result);
            });
        });

        app.get("/snapshot/:filename", function (request, response) {
            // TODO handle not found
            response.render('snapshot.html', {
                filename: request.params.filename,
                share: config,
                imageUrl: config.url + '/images/' + request.params.filename + ".png"
            });
        });

        app.post('/image', function (request, response) {
            var base64Data = request.body.imageData.replace(/^data:image\/png;base64,/, "");
            var filename = new Date().getTime().toString() + ".png";
            fs.writeFile(imageFolder + "/" + filename, base64Data, 'base64', function(err) {
                if (err) {
                    console.error(err);
                    response.send({error: "Your image cannot be uploaded, please try again."});
                    return;
                }
                db.addPhoto(connection, filename, function (err) {
                    if (err) {
                        console.error(err);
                        response.send({
                            error: "Your image " + config.url + "/images/" +
                            filename + "cannot be saved into the database."
                        });
                        return;
                    }
                    response.send({filename: filename.replace(/.png$/, '')});
                })
            });
        });

        app.listen(app.get('port'), function() {
            console.log("Node app is running at localhost:" + app.get('port'));
        });
    });

});
