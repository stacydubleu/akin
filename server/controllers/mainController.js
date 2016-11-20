var path = require('path');

module.exports.getIndex = function(request, response) {
    
    var status = false;
    var name = "";
    var userId = "";

    if (request.user) {
        status = true;
        name = (request.user.givenName).toUpperCase();
        userId = request.user.href.substr(-22);
    }

    response.render('index', { greeting: 'AKIN', name: name, userId: userId,  status: status });
};
