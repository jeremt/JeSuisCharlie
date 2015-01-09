
function Photobooth(onInit) {
    this.video = document.querySelector('video');
    this.canvas = document.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.filters = [];

    var _this = this;
    var _updateVideo = function(){

        if (_this.video.videoWidth > 0 && _this.video.videoHeight > 0) {
            // Resize the canvas to match video size
            if (_this.canvas.width != _this.video.videoWidth)
                _this.canvas.width = Math.min(_this.video.videoWidth, _this.video.videoHeight);
            if (_this.canvas.height != _this.video.videoHeight)
                _this.canvas.height = Math.min(_this.video.videoWidth, _this.video.videoHeight);

            _this.context.save();
                _this.context.translate(_this.canvas.width, 0);
                _this.context.scale(-1, 1);
                _this.context.drawImage(
                    _this.video, 0, 0, _this.canvas.width, _this.canvas.height,
                    0, 0, _this.canvas.width, _this.canvas.height);
            _this.context.restore();

            _this.context.save();
                _this.context.font = '70px block_bertholdregular';
                _this.context.textAlign = 'center';
                _this.context.fillStyle = '#fff';
                _this.context.shadowBlur = 10;
                _this.context.shadowColor = 'black';
                _this.context.fillText("#JESUISCHARLIE", _this.canvas.width / 2, 450);
            _this.context.restore();

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
        navigator.getUserMedia({video: {
            mandatory: {
                maxWidth: 512,
                maxHeight: 512,
                minAspectRatio: 1,
                maxAspectRatio: 1
            }
        }}, function (stream) {

            onInit();

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

Photobooth.prototype.getDataUrl = function() {
    return this.canvas.toDataURL();
};

Photobooth.prototype.addFilter = function(filter) {
    this.filters.push(filter);
};