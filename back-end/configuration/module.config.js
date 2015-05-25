(function() {
  'use strict';

  var path      = require('path'),
      mongoose  = require('mongoose'),
      nunjucks  = require('nunjucks'),
      Promise   = require('bluebird'),
      rootPath  = path.normalize(__dirname + '/../../'),
      service   = '../services/';

  module.exports = {

    rootPath          : rootPath,
    authorize         : require(service + 'authorize'),
    authorizeUponLogin: require(service + 'authorizeUponLogin'),
    clusterService    : require(service + './cluster'),
    createSendToken   : require(service + './createSendToken'),
    error             : require(service + './error'),
    facebookAuth      : require(service + './facebookAuth'),
    get               : require(service + './get'),
    googleAuth        : require(service + './googleAuth'),
    linkedin_auth     : require(service + './linkedin_auth'),
    save              : require(service + './save'),
    update            : require(service + './update'),
    xPoweredBy        : require(service + './xPoweredBy'),

    config            : require('./settings.config'),
    mongoDB           : require('../configuration/mongodb'),
    use_app           : require('./use_app.config'),
    use_api           : require('./use_api.config'),

    /*Model*/
    Clicked_Items     : require('../model/Clicked_Items'),
    Dates_Login       : require('../model/Dates_Login'),
    Saved_Items       : require('../model/Saved_Items'),
    Search_Terms      : require('../model/Search_Terms'),
    User              : require('../model/User'),

    args              : require('yargs').argv,
    bodyParser        : require('body-parser'),
    chalk             : require('chalk'),
    cluster           : require('cluster'),
    compression       : require('compression'),
    express           : require('express'),
    expressSession    : require('express-session'),
    favicon           : require('serve-favicon'),
    fs                : require('fs'),
    http              : require('http'),
    https             : require('https'),
    jwt               : require('jwt-simple'),
    LocalStrategy     : require('passport-local').Strategy,
    logger            : require('morgan'),
    methodOverride    : require('method-override'),
    moment            : require('moment'),
    mongoose          : Promise.promisifyAll(mongoose),
    multer            : require('multer'),
    numCPUs           : require('os').cpus().length,
    nunjucks          : require('nunjucks'),
    nunjucksEnv       : new nunjucks.Environment(new nunjucks.FileSystemLoader
      (path.join(rootPath, 'views'))),
    nunjucksEnvBuild  : new nunjucks.Environment(new nunjucks.FileSystemLoader
      (path.join(rootPath, 'build'))),
    ObjectID          : require('mongodb').ObjectID,
    passport          : require('passport'),
    Promise           : require('bluebird'),
    qs                : require('querystring'),
    request           : require('request-promise'),
    url               : require('url'),

    port              : process.env.PORT || 3000,
    environment       : process.env.NODE_ENV || 'development',

    faviconPath       : rootPath + 'front-end/resources/favicon.ico',
    nunjucksPath      : path.join(rootPath, 'front-end/views'),
    nunjucksPathBuild : path.join(rootPath, 'build'),
    css               : path.join(rootPath, 'front-end/resources/css'),
    fonts             : path.join(rootPath, 'front-end/resources/fonts'),
    img               : path.join(rootPath, 'front-end/resources/img'),
    js                : path.join(rootPath, 'front-end/resources/js'),
    compiledCss       : path.join(rootPath, 'front-end/.tmp'),
    bowerComponents   : path.join(rootPath, 'front-end/bower'),
    commonViews       : path.join(rootPath, 'front-end/views/commons'),

    buildCss          : path.join(rootPath, 'build/css'),
    buildFonts        : path.join(rootPath, 'build/fonts'),
    buildImg          : path.join(rootPath, 'build/img'),
    buildJs           : path.join(rootPath, 'build/js'),
    commonViewsBuild  : path.join(rootPath, 'build/commons')
  };
}());
