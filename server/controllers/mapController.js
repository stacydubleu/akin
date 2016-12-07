var path = require('path');
var http = require('http');
var request = require('request');

module.exports.getMap = function(req, res) {
    var name = (req.user.givenName).toUpperCase();
    res.render('map', { name: name });
};

module.exports.getMarkers = function(req, res) {
    req.db.collection('users').find({ "signal": "active" }).toArray(function(err, data) {
        res.send(data);
    });
};

module.exports.googleGeocode = function(req, response) {

    var userLocation = req.query.userLocation;
    var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + userLocation + '&key=' + req.dotenv.GOOGLE_KEY;

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
