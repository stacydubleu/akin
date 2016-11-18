var path = require('path');

module.exports.getMap = function(request, response) {

    var name = (request.user.givenName).toUpperCase();

    response.render('map', {name: name});

};
