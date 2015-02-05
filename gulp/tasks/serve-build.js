(function() {
  'use strict';

  module.exports = function(args, browserSync, gulp, nodemon, util, logger, serve, config) {
    gulp.task('serve-build', ['optimize'], function() {
      logger(util, 'Running Production Server');
      serve(false, args, gulp, browserSync, nodemon, util, logger, config);
    });
  };
}());
