var path = require('path');
var Promise = require("bluebird");

module.exports.getPing = function(request, response) {

};

module.exports.deleteSignal = function(request, response) {

    var io = request.io;
    var userHref = request.body.userHref;
    var userName = request.user.givenName;
    var data = { userHref: userHref, userName: userName };
    io.emit('respondPing', data);
    console.log('after io');

    request.db.collection('users').update({ "userId": userHref }, {
        $set: {
            signal: "inactive",
        }
    }, { upsert: true }).then(function() {
        response.send({ signal: 'inactive' });
    });

};

module.exports.getActive = function(request, response) {

    request.db.collection('users').find({ "signal": "active" }).toArray(function(err, result) {
        if (err) throw err;
        else {
            response.send(result);
        }
    });
};

module.exports.postPing = function(request, response) {
    console.log(request.user.givenName + ' sent a ping');

    var io = request.io;
    var userId = request.user.href;
    var userName = request.user.givenName;
    var signal = "";

    request.db.collection('users').findOne({ $and: [{ userId: userId }, { signal: "active" }] }, function(err, res) {
        if (res) {
            signal = 'active';
            io.emit('testing', userName + "'s signal is already on..");
            response.send({ userName: userName });
        } else {
            signal = 'inactive';
            io.emit('testing', userName + "'s signal has been activated!");
            activateSignal();
        }
    });

    function activateSignal() {
        request.db.collection('users').update({ "userId": userId }, {
            $set: {
                signal: "active",
                userName: userName,
                userEmail: request.user.email
            }
        }, { upsert: true }).then(function() {
            response.send({ userName: userName });
        });


    }

};
