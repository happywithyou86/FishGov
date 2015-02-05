(function() {
  'use strict';

  module.exports = function(gulp, util, logger, config) {
    gulp.task('copy-commons', ['clean-commons'], function() {
      logger(util, 'Copying Commons Html into Build Folder');
      return gulp
        .src(config.commons)
        .pipe(gulp.dest(config.build + 'commons'));
    });
    gulp.task('copy-admin', ['clean-admin'], function() {
      logger(util, 'Copying Admin Routes Html into Build Folder');
      return gulp
        .src(config.adminRoutes)
        .pipe(gulp.dest(config.build + 'admin'));
    });
    gulp.task('copy-client', ['clean-client'], function() {
      logger(util, 'Copying Client Routes Html into Build Folder');
      return gulp
        .src(config.clientRoutes)
        .pipe(gulp.dest(config.build + 'client'));
    });

    gulp.task('copy', ['copy-commons', 'copy-admin', 'copy-client']);
  };
}());
