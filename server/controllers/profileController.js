var path = require('path');

var userHref = "";
var userName = "";
var signal = "";
var signalColor = "";
var signalOpacity = "";
var userLocation = "";
var sourceUserHref = "";
var signalBoolean = "";
var ownProfile = false;


module.exports.postLocation = function(request, response) {

    var userLat = request.body.userLat;
    var userLong = request.body.userLong;
    userName = request.body.userName;
    userLocation = request.body.userLocation;

    userHref = "https://api.stormpath.com/v1/accounts/" + request.body.userId;

    request.db.collection('users').update({ "userId": userHref }, {
        $set: {
            userName: userName,
            userLocation: userLocation,
            userLat: userLat,
            userLong: userLong,
            signal: "inactive"
        }
    }, { upsert: true }).then(function() {
        response.sendStatus(200);
    });
};

module.exports.getProfile = function(request, response) {
    name = request.user.givenName;
    location = "Something";
    sourceUserHref = request.user.href;
    var userId = request.user.href;
    var linkId = /[^/]*$/.exec(userId)[0];
    userHref = "https://api.stormpath.com/v1/accounts/" + request.params.userId;

    if (sourceUserHref === userHref) {
        ownProfile = true;
    } else {
        ownProfile = false;
    }

    request.db.collection('users').findOne({ "userId": userHref }, function(err, result) {
        if (err) throw err;
        else {
            userLocation = result.userLocation;
            userName = result.userName;
            name = result.userName.toUpperCase();
            location = result.userLocation;
            signal = result.signal;
            if (signal === "active") {
                signalColor = '#0099ff';
                signalOpacity = 1;
                signalBoolean = 1;
            } else if (signal === "inactive") {
                signalColor = '#555';
                signalOpacity = .6;
            } else {
                signalColor = '#555';
                signalOpacity = .6;
                signal = "inactive";
            }

            response.render('profile', {
                name: name,
                location: location,
                userHref: userHref,
                userName: userName,
                userId: linkId,
                signal: signal,
                signalColor: signalColor,
                signalOpacity: signalOpacity,
                signalBoolean: signalBoolean,
                userLocation: userLocation,
                ownProfile: ownProfile
            });
        }
    });
};
