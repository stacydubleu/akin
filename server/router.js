var express = require('express');
var router = express.Router();
var bodyP = require('body-parser');

var mainController = require('../controllers/mainController');
router.get('/', mainController.main);
router.post('/writeComment', mainController.writeComment);

var loginController = require('../controllers/loginController');
router.get('/login', loginController.main);

var sendPingController = require('../controllers/sendPingController');
router.get('/send_ping', sendPingController.main);


module.exports = router;