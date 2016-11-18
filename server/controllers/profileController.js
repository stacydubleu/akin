var path = require('path');

var userHref;
var userName;


module.exports.getProfile = function(request, response) {

    userHref = "https://api.stormpath.com/v1/accounts/" + request.params.userId;

    request.db.collection('users').findOne({ "userId": userHref }, function(err, result) {
        if (err) throw err;
        else {
            userName = result.userName;
            response.render('profile', {
                userHref: userHref,
                userName: userName
            });
        }
    });
};
