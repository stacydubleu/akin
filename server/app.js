var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var db;

var app = express();
var router = require('./router');

// Initialize mongodb connection
MongoClient.connect("mongodb://localhost:27017/akinDB", function (err, database) {
    if (err) {
        console.log("\n\t *******\n mongodb connection error. ", err);
        throw err;
    }
    console.log("MongoDB connected successfully");
    db = database;
});

// Expose our db to our router
app.use(function (req, res, next) {
    req.db = db;
    req.app_setting_port = port;
    req.myParisite = {'left': 'right'};
    next();
});

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));

// view engine setup
app.set('trust proxy', true);
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//router setup
app.use('/', router);

var port = process.env.PORT || 1111;
app.listen(port, function() {
    console.log('Application running at http://localhost:' + port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('../views/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('../views/error', {
        message: err.message,
        error: {}
    });
});
