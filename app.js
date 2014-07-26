var express = require('express');
var http = require('http');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// view engine setup - Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

var routes = require('./routes/route')(app);
var indexer = require('./controller/indexer')(app);

//Initializes indexer
indexer.initialize();

app.listen(3000, function () {
    console.log("express has started on port 3000");
});

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

module.exports = app;