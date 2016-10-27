var express = require('express');
var router = express.Router();

router.get('/library', function(req, res, next){
	res.render('library', {title: 'Library of Sounds'});
})