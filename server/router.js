var express = require('express');
var router = express.Router();
var bodyP = require('body-parser');
var stormpath = require('express-stormpath');


var mainController = require('./controllers/mainController');
var mapController = require('./controllers/mapController');
var pingController = require('./controllers/pingController');

//main page controller routes
router.get('/', stormpath.getUser, mainController.getIndex);

//ping controller routes
router.get('/get_ping', stormpath.loginRequired, pingController.getPing);
router.post('/postPing', stormpath.loginRequired, pingController.postPing);

//map controller routes
router.get('/get_map', stormpath.loginRequired, mapController.getMap);


module.exports = router;
