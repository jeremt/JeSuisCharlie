
var photobooth = new Photobooth();
var snapshotBtn = document.getElementById("snapshotBtn");

snapshotBtn.addEventListener("click", function () {
    photobooth.takeSnapshot();
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