'use strict';

var express         = require('express'),
    path            = require('path'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    parserCookie    = require('cookie').parse,
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    multer          = require('multer'),
    compression     = require('compression'),
    session         = require('express-session'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local').Strategy,
    nunjucks        = require('nunjucks'),
    flash           = require('connect-flash'),

    mongo           = require('./mongodb'),
    MongoStore      = require('connect-mongo')(session),

    rootPath        = path.normalize(__dirname + '/../../'),
    env             = new nunjucks.Environment(new nunjucks.FileSystemLoader( path.join(rootPath, 'views') ));


  /**
   ** Express Configuration
  ***/
  module.exports = function (app) {
    env.express( app )
    nunjucks.configure(path.join(rootPath, 'front-end/views'), {
      autoescape: true,
      express: app,
      watch: true,
      tags: {
        variableStart: '<$',
        variableEnd: '$>',
      }
    });
    app.set('port', process.env.PORT || 3001)
    app.set('view engine', 'html');
    app.use(compression());
    app.use(favicon(rootPath + 'front-end/resources/favicon.ico'))
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(multer());
    app.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method
        delete req.body._method
        return method
      }
    }))
    app.use(cookieParser('secret'));
    app.use(session({
                    store: new MongoStore({
                       db: 'sessions'
                    }),
                    secret: 'joriescanino',
                    /**
                     ** @cookie: { maxAge: 60000 }
                     ** Use this so that session expires
                    ***/
                    saveUninitialized: true,
                    resave: true}))

    app.use(flash()); /*make this module work!!!OK*/
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/css', express.static(path.join(rootPath, 'front-end/resources/css')))
    app.use('/fonts', express.static(path.join(rootPath, 'front-end/resources/fonts')))
    app.use('/images', express.static(path.join(rootPath, 'front-end/resources/img')))
    app.use('/js', express.static(path.join(rootPath, 'front-end/resources/js')))
    app.use('/compileCss', express.static(path.join(rootPath, 'front-end/.tmp')))
    app.use('/bower_components', express.static(path.join(rootPath, 'front-end/bower')))
    app.use('/commonsHtml', express.static(path.join(rootPath, 'front-end/views/commons')))



    app.use(function( req, res, next ) {
      var username = req.user == undefined? '': req.user.username;
      res.adminCredentials = {isAuthenticated: req.isAuthenticated(), username: username}
      // //parserCookie(req.headers.cookie)
      // console.log( req.cookies.auth_token )
      
      next();
    })

  }
