var path = require('path');

var userHref = "";
var userName = "";
var signal = "";
var signalColor = "";
var userLocation = "";
var sourceUserHref = "";
var ownProfile = false;


module.exports.postLocation = function(request, response) {

    var userLat = request.body.userLat;
    var userLong = request.body.userLong;
    userLocation = request.body.userLocation;
    userHref = "https://api.stormpath.com/v1/accounts/" + request.body.userId;

    request.db.collection('users').update({ "userId": userHref }, {
        $set: {
            userLocation: userLocation,
            userLat: userLat,
            userLong: userLong
        }
    }, { upsert: true }).then(function() {
        response.sendStatus(200);
    });
};

module.exports.getProfile = function(request, response) {

    sourceUserHref = request.user.href;
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
            signal = result.signal;
            if (signal === "active") {
                signalColor = 'green';
            } else if (signal === "inactive") {
                signalColor = 'red';
            }
            response.render('profile', {
                userHref: userHref,
                userName: userName,
                signal: signal,
                signalColor: signalColor,
                userLocation: userLocation,
                ownProfile: ownProfile
            });
        }
    });
};
