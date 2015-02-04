(function() {
  'use strict';

  module.exports = function(gulp, inject, util, wiredep, logger, config) {
    var options = config.getWireDepDefaultOptions();
    gulp.task('wiredep', function() {
      logger(util, 'Wire up our js css and app.js into our html' );
      return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(config.js, {read:false}), {
          ignorePath: '/front-end/resources'
        }))
        .pipe(gulp.dest(config.client));
    });
  };
}());
