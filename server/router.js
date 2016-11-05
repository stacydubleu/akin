var express = require('express');
var router = express.Router();
var bodyP = require('body-parser');
var stormpath = require('express-stormpath');


var mainController = require('./controllers/mainController');
var mapController = require('./controllers/mapController');
var pingController = require('./controllers/pingController');
var boxController = require('./controllers/boxController');


//main page controller routes
router.get('/', stormpath.getUser, mainController.getIndex);

//ping controller routes
router.get('/getPing', stormpath.loginRequired, pingController.getPing);
router.post('/postPing', stormpath.loginRequired, pingController.postPing);

//map controller routes
router.get('/getMap', stormpath.loginRequired, mapController.getMap);

//box controller routes
router.get('/getBox', stormpath.loginRequired, boxController.getBox);



module.exports = router;
