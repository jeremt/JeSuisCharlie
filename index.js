var express = require('express');
var fs = require('fs');
var ejs = require('ejs');
var app = express();
var imageFolder = __dirname + "/public/images";

var shareInfo = {
    url: 'http://www.jesuischarlie.photo',
    title: 'JeSuisCharlie',
    summary: fs.readFileSync(__dirname + '/description.txt').toString(),
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
var currentId = fs.readdirSync(imageFolder).length - 1;

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.use(express.static(__dirname + '/public'));
app.use(require('body-parser').json({limit: '50mb'}));

app.get('/', function(request, response) {
    response.render('index.html');
});

app.get('/gallery', function(request, response) {
    response.render('gallery.html', {currentId: currentId});
});

app.get("/snapshot/:currentId", function (request, response) {
    if (request.params.currentId > currentId + 1)
        response.redirect('/gallery');
    else {
        response.render('snapshot.html', {
            currentId: request.params.currentId,
            share: shareInfo,
            imageUrl: 'http://www.jesuischarlie.photo/images/' + request.params.currentId + '.png'
        });
    }
});

app.post('/upload', function (request, response) {
    var base64Data = request.body.imageData.replace(/^data:image\/png;base64,/, "");
    fs.writeFile(imageFolder + "/" + ++currentId + ".png", base64Data, 'base64', function(err) {
        if (err) {
            console.log(err);
        }
        else {
            response.send({currentId: currentId});
        }
    });
});

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});