function sendJson(route, data, callback) {
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", route, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onloadend = function () {
        callback(JSON.parse(xhr.responseText));
    };

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

}

function getJson(route, callback) {
    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open("GET", route, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    xhr.onloadend = function () {
        callback(JSON.parse(xhr.responseText));
    };

    // send the collected data as JSON
    xhr.send();

}