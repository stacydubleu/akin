var express = require('express');
var router = express.Router();

router.get('/sendsignal', function(req, res, next){
	res.render('sendsignal', {title: 'Send Signal'});
})