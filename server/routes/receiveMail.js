var express = require('express');
var router = express.Router();

router.get('/receivemail', function(req, res, next){
	res.render('receivemail', {title: 'Receive Mail'});
})