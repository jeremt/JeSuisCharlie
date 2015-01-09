
function Photobooth() {
    this.video = document.querySelector('video');
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.filters = [];

    var _this = this;
    var _updateVideo = function(){

        if (_this.video.videoWidth > 0 && _this.video.videoHeight > 0) {
            // Resize the canvas to match video size
            if (_this.canvas.width != _this.video.videoWidth)   _this.canvas.width = _this.video.videoWidth;
            if (_this.canvas.height != _this.video.videoHeight) _this.canvas.height = _this.video.videoHeight;

            // Copy the current video frame by drawing it onto the
            // canvas's context
            _this.context.drawImage(_this.video, 0, 0, _this.canvas.width, _this.canvas.height);

            // Draw the image to the screen.
            if (_this.canvas.width > 0 && _this.canvas.height > 0) {
                var image = _this.context.getImageData(0, 0, _this.canvas.width, _this.canvas.height);
                for (var i in _this.filters) {
                    image = _this.filters[i](image);
                }
                _this.context.putImageData(image, 0, 0);
            }

        }
        requestAnimationFrame(_updateVideo);
    };

    if (navigator.getUserMedia) {
        navigator.getUserMedia({video: true}, function (stream) {

            // set video source from webcam and play video
            if (_this.video.mozSrcObject !== undefined) {
                _this.video.mozSrcObject = stream;
            }
            else {
                _this.video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
            }
            _this.video.play();

            _updateVideo();
        }, function (error) {
            console.error(error);
        });
    }
}

Photobooth.prototype.takeSnapshot = function() {
    document.querySelector("#snapshot").src = this.canvas.toDataURL();
};

Photobooth.prototype.addFilter = function(filter) {
    this.filters.push(filter);
};

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