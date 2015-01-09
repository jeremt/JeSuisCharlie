var request = require('request')
    , qs = require('qs');

var callbackURL = 'http://'+process.env.OPENSHIFT_APP_DNS+'/callback'
    , APP_ID = '1565904010321277'
    , APP_SECRET = '766999f763d28f5b471d9b1edb7453b6';


var state = '';
var access_token = '';
var expires = '';


function login(req, res) {

    state = Math.floor(Math.random()*1e19);

    var params = {
        client_id: APP_ID,
        redirect_uri: callbackURL,
        state: state,
        display: 'popup',
        scope: 'publish_stream' // required in order to post on user's feed
    };

    params = qs.stringify(params);
    res.end('https://www.facebook.com/dialog/oauth?'+params);
}

function callback(req, res) {
    var code = req.query.code
        , cb_state = req.query.state
        , errorreason = req.query.error_reason
        , error = req.query.error;

    if (state == cb_state) {

        if (code !== undefined) {
            var params = {
                client_id: APP_ID,
                redirect_uri: callbackURL,
                client_secret: APP_SECRET,
                code: code
            };

            request.get({url:'https://graph.facebook.com/oauth/access_token',qs:params}, function(err, resp, body) {
                var results = qs.parse(body);

                // Retreive the access_token and store it for future use
                access_token = results.access_token;
                expires = results.expires;
                exports.access_token = access_token;
                exports.expires = expires;

                console.log("Connected to Facebook");
                // close the popup
                var output = '<html><head></head><body onload="window.close();">Closing this window</body></html>';
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(output);
            });

        } else {
            console.error('Code is undefined: '+code);
            console.error('Error: '+ error + ' - '+ errorreason);
        }

    } else {
        console.error('Mismatch with variable "state". Redirecting to /');
        res.redirect('/');
    }
}

exports.login = login;
exports.callback = callback;