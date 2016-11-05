var path = require('path');

module.exports.getBox = function(request, response) {

    var name = (request.user.givenName).toUpperCase();

    response.render('box', {name: name});


};
