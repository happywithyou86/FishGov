(function() {
  'use strict';

  module.exports = function(gulp, config ) {
    gulp.task('watch-stylus', function () {
      gulp.watch(config.stylus, ['stylus'] );
    });
  };

}());
