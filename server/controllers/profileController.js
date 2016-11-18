var path = require('path');

var userHref;
var userName;
var signal;
var signalColor;


module.exports.getProfile = function(request, response) {

    userHref = "https://api.stormpath.com/v1/accounts/" + request.params.userId;

    request.db.collection('users').findOne({ "userId": userHref }, function(err, result) {
        if (err) throw err;
        else {
            userName = result.userName;
            signal = result.signal;
            console.log(signal);
            if (signal === "active") {
            	signalColor = 'green';
            } else if (signal === "inactive") {
            	signalColor = 'red';
            }
            response.render('profile', {
                userHref: userHref,
                userName: userName,
                signal: signal,
                signalColor: signalColor
            });
        }
    });
};
