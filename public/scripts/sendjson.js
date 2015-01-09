function sendJson(route, data, callback) {
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", route, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        callback(JSON.parse(xhr.responseText));
    };

}