var path = require('path');

module.exports.main = function(request, response) {
    response.render('index', { greeting: 'akin' });
};
