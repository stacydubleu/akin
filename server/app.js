var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var stormpath = require('express-stormpath');
var socketIO = require('socket.io');

//for secret keys and passwords
var dotenv = require('dotenv');
dotenv.load();

var port = process.env.EXPRESS_PORT || 1111;

var MongoClient = require('mongodb').MongoClient;
var db;

var app = express();

//socket io linking
var server = require('http').Server(app);
var io = socketIO(server);

var router = require('./router');

//socket.io debugging
io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

// Initialize mongodb connection
var mdbuser = process.env.USERNAME_MLAB;
var mdbpw = process.env.PASSWORD_MLAB;
MongoClient.connect("mongodb://" + mdbuser + ":" + mdbpw + "@ds031965.mlab.com:31965/users", function(err, database) {
    if (err) {
        console.log("\n\t WE HAVE A PROBLEM\n mongodb connection error. ", err);
        throw err;
    }
    console.log("MongoDB connected successfully");
    db = database;
});

// Expose our db and socket.io to our router
app.use(function(req, res, next) {
    req.db = db;
    req.io = io;
    req.app_setting_port = port;
    req.myParisite = { 'left': 'right' };
    next();
});

//favicon is not loading
app.use(favicon(path.join('./public/images/favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//declare public folder as static
// __dirname - native Node variable contain file path of current folder
// second param is name of static resource folder
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./public'));

// view engine setup
app.set('trust proxy', true);

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//router setup
app.use('/', router);

//stormpath linking up
app.use(stormpath.init(app, {
    website: true,
    register: {
        enabled: true,
        autoLogin: true,
        autoAuthorize: true
    },
}));

//start server when stormpath is ready
app.on('stormpath.ready', function() {
    console.log('Stormpath Ready');
    var port = process.env.PORT || 1111;
    server.listen(port, function() {
        console.log('Application running at http://localhost:' + port);
    });
});


//////////////////
//error handling//
//////////////////

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
