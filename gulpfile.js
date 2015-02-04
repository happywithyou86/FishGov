(function() {
  'use strict';

  var gulp          = require('gulp'),
      csslint       = require('gulp-csslint'),
      ifs           = require('gulp-if'),
      inject        = require('gulp-inject'),
      jshint        = require('gulp-jshint'),
      jscs          = require('gulp-jscs'),
      nodemon       = require('gulp-nodemon'),
      prefixer      = require('gulp-autoprefixer'),
      print         = require('gulp-print'),
      stylus        = require('gulp-stylus'),
      util          = require('gulp-util'),
      args          = require('yargs').argv,
      del           = require('del'),
      karma         = require('karma').server,
      wiredep       = require('wiredep').stream,
      config        = require('./gulp.config')(),
      clean         = require('./gulp/tasks/util/clean'),
      logger        = require('./gulp/tasks/util/logger'),
      handleErrors  = require('./gulp/tasks/util/handleErrors');
      /*jsDoc         = require('gulp-jsdoc' );*/

  require('./gulp/tasks/gulp-stylus.js')(del, gulp, stylus, prefixer, csslint, util, clean,
    handleErrors, logger, config);
  require('./gulp/tasks/gulp-jscshint.js')(gulp, args, ifs, print, jshint, jscs,
    util, handleErrors, logger, config);
  require('./gulp/tasks/gulp-watch.js')(gulp, config);
  require('./gulp/tasks/gulp-karma.js')(gulp, karma);
  require('./gulp/tasks/wiredep.js')(gulp, inject, util, wiredep, logger, config);
  require('./gulp/tasks/gulp-inject.js')(gulp, inject, util, wiredep, logger, config);
  require('./gulp/tasks/serve-dev.js')(gulp, nodemon, util, logger, config);

}());
