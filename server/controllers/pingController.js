var path = require('path');
var Promise = require("bluebird");


module.exports.getPing = function(request, response) {

};

var handleError = function(error) {
    console.log('Error compiling active signals');
};

module.exports.getActive = function(request, response) {

  request.db.collection('users').find({ "signal": "active" }).toArray(function(err, result) {
    	// console.log(result);
    	// console.log(result[0].userName);
        if (err) throw err;
        else {
            response.send(result);
        }

    });


    // cursor.forEach(function(data) {
    // 	console.log(data.userName + "abc");
    // });

    // if (cursor) {
    //     getActiveSignals(cursor, response).catch(handleError);
    // } else {
    //     response.sendStatus(400);
    // }
};


// module.exports.getActive = function(request, response) {

//     var cursor = request.db.collection('users').find({ signal: "active" });
//     var userArray = [];

//     cursor.forEach(function(data) {
//         var userName = data.userName;
//         userArray.push(userName);
//     }).then(function() {
//         console.log(userArray);
//         response.send(userArray);
//     });

// };

module.exports.postPing = function(request, response) {
    // console.log(request.user.givenName + ' sent a ping');

    var io = request.io;
    var userId = request.user.href;
    var userName = request.user.givenName;
    var signal = "";

    request.db.collection('users').findOne({ userId: userId }, { signal: "active" }, function(err, res) {
        if (res) {
            signal = 'active';
            io.emit('testing', userName + "'s signal is already active!");
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
    };

};
