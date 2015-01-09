var express = require('express');
var fs = require("fs");
var ejs = require('ejs');
var app = express();

if(!fs.existsSync("public/images")){
    fs.mkdirSync("public/images", 0766, function(err){
        if(err){
            console.log(err);
            response.send("ERROR! Can't make the images directory! \n");
        }
    });
}

var currentId = fs.readdirSync('public/images').length - 1;

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
        response.render('snapshot.html', {currentId: request.params.currentId});
    }
});

app.post('/upload', function (request, response) {
    var base64Data = request.body.imageData.replace(/^data:image\/png;base64,/, "");
    fs.writeFile("public/images/" + ++currentId + ".png", base64Data, 'base64', function(err) {
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