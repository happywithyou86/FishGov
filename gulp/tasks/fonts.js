(function() {
  'use strict';

  module.exports = function(gulp, util, logger, config) {
    gulp.task('fonts', ['clean-fonts'], function() {
      logger(util, 'Copying Fonts');
      return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
    });
  };
}());
