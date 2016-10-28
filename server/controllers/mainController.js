var path = require('path');

module.exports.getIndex = function(request, response) {
    
    var status = false;
    var name = "";

    if (request.user) {
        status = true;
        name = (request.user.givenName).toUpperCase();
    }
    response.render('index', { greeting: 'AKIN', name: name, status: status });
};
