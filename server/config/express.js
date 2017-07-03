/**
 * Express configuration
 */

'use strict';

var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');



module.exports = function(app) {
  var env = app.get('env');
  
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash()); 
  if ('production' === env) {
    app.use(morgan('dev'));
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(morgan('dev'));
    app.use(errorHandler()); // Error handler - has to be last
  }
  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/../views')

};