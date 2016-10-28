var path = require('path');

module.exports.getPing = function(request, response) {

};

module.exports.postPing = function(request, response) {
	console.log(request.user.givenName + ' sent a ping');
    var io = request.io;
    io.emit('testing', 'hello hello!, this is a global ping from ' + request.user.givenName);
    response.sendStatus(200);
};
