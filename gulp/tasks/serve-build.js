(function() {
  'use strict';

  module.exports = function(args, browserSync, gulp, nodemon, util, logger, serve, config) {
    /**
     * Used for the constants in the logger
     * for Angularjs $log
     */
    process.env.NODE_ENV = 'production';
    gulp.task('serve-build', ['optimize'], function() {
      logger(util, 'Running Production Server');
      serve(false, false, args, gulp, browserSync, nodemon, util, logger, config);
    });
  };
}());
