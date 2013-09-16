"use strict";
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./app/routes');
var api = require('./app/routes/api');
var user = require('./app/routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/api/stage/:stage', api.stage);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Sokoban server listening on port ' + app.get('port'));
});