(function() {
  'use strict';

  module.exports = function(gulp, imagemin, util, logger, config) {
    gulp.task('images', ['clean-images'], function() {
      logger(util, 'Copying and Compressing Images now...');
      return gulp
        .src(config.images)
        .pipe(imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'img'));
    });
  };
}());
