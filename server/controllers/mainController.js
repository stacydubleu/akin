var path = require('path');

module.exports.getIndex = function(request, response) {

    var status = false;
    var name = "";
    var userId = "";
    var linkId = "";
    var location = "";
    var userHref = "";
    var signal = "inactive";
    var showButton = "";
    if (request.user) {
        status = true;
        name = (request.user.givenName).toUpperCase();
        userId = request.user.href;
        linkId = /[^/]*$/.exec(userId)[0];
        userHref = "https://api.stormpath.com/v1/accounts/" + linkId;

        request.db.collection('users').findOne({ "userId": userHref }, function(err, result) {
            try {
                signal = result.signal;
                if (signal && signal === "inactive") {
                    showButton = true;
                } else {
                    showButton = "";
                }
                location = result.userLocation;
            } catch (e) {}
            response.render('index', {
                greeting: 'AKIN',
                name: name,
                userId: linkId,
                userHref: userHref,
                status: status,
                signal: signal,
                showButton: showButton,
                location: location
            });
        });

    } else {
        response.render('index', {
            greeting: 'AKIN',
            name: name,
            userId: linkId,
            userHref: userHref,
            status: status,
            signal: signal,
            showButton: showButton,
            location: location
        });
    }
};
