var express = require('express');
var router = express.Router();
var bodyP = require('body-parser');
var stormpath = require('express-stormpath');

var mainController = require('./controllers/mainController');
var mapController = require('./controllers/mapController');
var pingController = require('./controllers/pingController');
var profileController = require('./controllers/profileController');

//main page controller routes
router.get('/', stormpath.getUser, mainController.getIndex);

//ping controller routes
router.get('/getPing', stormpath.loginRequired, pingController.getPing);
router.post('/postPing', stormpath.loginRequired, pingController.postPing);
router.delete('/deleteSignal', stormpath.loginRequired, pingController.deleteSignal);

//profile routes	
router.get('/profile/:userId', stormpath.loginRequired, profileController.getProfile);
router.post('/postLocation', profileController.postLocation);


//get active pings
router.get('/getActive', stormpath.loginRequired, pingController.getActive);

//map controller routes
router.get('/getMap', stormpath.loginRequired, mapController.getMap);

module.exports = router;
