
var photobooth = new Photobooth(function () {
    document.getElementById("picture-box").style.display = "inline-block";
});
var snapshotBtn = document.getElementById("snapshotBtn");
var confirmBtn = document.getElementById("confirmBtn");

snapshotBtn.addEventListener("click", function () {
    document.getElementById("confirm-box").style.display = "inline-block";
    document.getElementById("picture-box").style.display = "none";
    document.getElementById("preview").src = photobooth.getDataUrl();
});

confirmBtn.addEventListener("click", function () {
    sendJson("/upload", {imageData: photobooth.getDataUrl()}, function (data) {
        window.location.href = "/snapshot/" + data.currentId;
    });
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