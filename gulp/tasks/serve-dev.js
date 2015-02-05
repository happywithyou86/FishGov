(function() {
  'use strict';


  module.exports = function(args, browserSync, gulp, nodemon, util, logger, serve, config) {
    gulp.task('serve-dev', ['optimize'], function() {
      logger(util, 'Running Development Server');
      serve(true, args, gulp, browserSync, nodemon, util, logger, config);
    });
  };
})();
