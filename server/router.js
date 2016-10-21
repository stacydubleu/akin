var express = require('express');
var router = express.Router();
var bodyP = require('body-parser');

var mainController = require('./controllers/mainController');

router.get('/', mainController.main);

router.post('/writeComment', mainController.writeComment);

module.exports = router;