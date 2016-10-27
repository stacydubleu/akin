var express = require('express');
var login = express.Router();
var bodyP = require('body-parser');

var mainController = require('../controllers/mainController');

login.get('/login', mainController.login);


module.exports = login;