var path = require('path');
var http = require('http');
var request = require('request');

module.exports.getMap = function(request, response) {
    var name = (request.user.givenName).toUpperCase();
    response.render('map', { name: name });
};

module.exports.getMarkers = function(request, response) {
    request.db.collection('users').find({ "signal": "active" }).toArray(function(err, data) {
        response.send(data);
    });
};

module.exports.googleGeocode = function(req, response) {

    var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&key=' + req.dotenv.GOOGLE_KEY;
    var userLocation = req.query.userLocation;

    request(geoUrl, function(err, res, body) {
        if (err) {
            console.log(err);
            response.sendStatus(400);
        } else {
            var parsedBody = JSON.parse(body);
            response.send(parsedBody);
        }
    });
};
