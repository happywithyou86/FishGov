(function() {
  'use strict';

  var gulp          = require('gulp'),
      annotate      = require('gulp-ng-annotate'),
      csslint       = require('gulp-csslint'),
      csso          = require('gulp-csso'),
      filter        = require('gulp-filter'),
      ifs           = require('gulp-if'),
      inject        = require('gulp-inject'),
      imagemin      = require('gulp-imagemin'),
      jshint        = require('gulp-jshint'),
      jscs          = require('gulp-jscs'),
      minifyHtml    = require('gulp-minify-html'),
      nodemon       = require('gulp-nodemon'),
      prefixer      = require('gulp-autoprefixer'),
      print         = require('gulp-print'),
      stylus        = require('gulp-stylus'),
      taskListing   = require('gulp-task-listing'),
      templateCache = require('gulp-angular-templatecache'),
      uglify        = require('gulp-uglify'),
      useref        = require('gulp-useref'),
      util          = require('gulp-util'),
      args          = require('yargs').argv,
      browserSync   = require('browser-sync'),
      del           = require('del'),
      karma         = require('karma').server,
      wiredep       = require('wiredep').stream,
      config        = require('./gulp.config')(),
      remove        = require('./gulp/tasks/util/remove'),
      logger        = require('./gulp/tasks/util/logger'),
      serve         = require('./gulp/tasks/util/serve'),
      handleErrors  = require('./gulp/tasks/util/handleErrors');
      /*jsDoc         = require('gulp-jsdoc' );*/

  require('./gulp/tasks/gulp-stylus.js')(del, gulp, stylus, prefixer, csslint, util, remove,
    handleErrors, logger, config);
  require('./gulp/tasks/gulp-jscshint.js')(gulp, args, ifs, print, jshint, jscs,
    util, handleErrors, logger, config);
  require('./gulp/tasks/gulp-watch-stylus.js')(gulp, config);
  require('./gulp/tasks/gulp-karma.js')(gulp, karma);
  require('./gulp/tasks/wiredep.js')(gulp, inject, util, wiredep, logger, config);
  require('./gulp/tasks/gulp-inject.js')(gulp, inject, util, wiredep, logger, config);
  require('./gulp/tasks/serve-dev.js')(args, browserSync, gulp, nodemon, util, logger, serve, config);
  require('./gulp/tasks/serve-build')(args, browserSync, gulp, nodemon, util, logger, serve, config);
  require('./gulp/tasks/gulp-taskListing')(gulp, taskListing);
  require('./gulp/tasks/default')(gulp);
  require('./gulp/tasks/fonts')(gulp, util, logger, config);
  require('./gulp/tasks/images')(gulp, imagemin, util, logger, config);
  require('./gulp/tasks/clean')(del, gulp, util, remove, logger, config);
  require('./gulp/tasks/templateCache')(gulp, minifyHtml, templateCache, util, logger, config);
  require('./gulp/tasks/optimize')(gulp, annotate, csso, filter, inject, uglify, useref, util, logger, config);
  require('./gulp/tasks/copy')(gulp, util, logger, config);
  require('./gulp/tasks/test')(gulp, util, logger, config);
}());
