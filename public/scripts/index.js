
var photobooth = new Photobooth();
var snapshotBtn = document.getElementById("snapshotBtn");
var retryBtn = document.getElementById("retryBtn");
var facebookBtn = document.getElementById("facebookBtn");
var galleryBtn = document.getElementById("galleryBtn");

snapshotBtn.addEventListener("click", function () {
    document.querySelector("#photobooth").style.display = 'none';
    document.querySelector("#snapshot").style.display = 'block';
    photobooth.takeSnapshot(document.querySelector("#snapshot img"));
});

retryBtn.addEventListener("click", function () {
    document.querySelector("#photobooth").style.display = 'block';
    document.querySelector("#snapshot").style.display = 'none';
});

facebookBtn.addEventListener("click", function () {
    FB.login(function(){
        console.log("TODO");
    }, {scope: 'publish_actions'});
});

galleryBtn.addEventListener("click", function () {
    console.log("Upload to gallery");
});

photobooth.addFilter(function (pixels) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i + 1];
        var b = d[i + 2];
        d[i] = d[i + 1] = d[i + 2] = (r+g+b)/3;
    }
    return pixels;
});