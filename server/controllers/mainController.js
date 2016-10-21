var path = require('path');

module.exports.main = function(request, response) {


    response.render('index', { greeting: 'akin!' });

};

module.exports.writeComment = function(request, response) {

    var comment = request.body.comment;
    console.log(comment);

    // req.db.collection('comments').update({ "venueId": venueId }, {
    //     $set: {
    //         corkage: { fee: fee }
    //     }
    // }, { upsert: true }).then(function() {
    //     res.send({});
    // });

    // req.db.collection('comments').update({ "venueId": venueId }, {
    //     $set: {
    //         corkage: { fee: fee }
    //     }
    // }, { upsert: true }).then(function() {
    //     res.send({});
    // });
};

// module.exports.getExample = function(req, res) {
//     var venueId = req.query.venueId;
//     var cursor = req.db.collection('business').findOne({ venueId: venueId }, { capacity: 1, _id: 0 }, function(err, response) {

//         if (response) {
//             res.send(response);
//         } else {
//             res.sendStatus(200);
//         }
//     });
// };
