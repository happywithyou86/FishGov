(function() {
  'use strict';

  module.exports = function(gulp, inject, util, wiredep, logger, config) {
    gulp.task('inject', ['wiredep', 'stylus', 'templatecache'], function() {
      logger(util, 'Wire up the app.css into the html, then call wiredep' );
      return gulp
        .src(config.index)
        .pipe(inject(gulp.src(config.css, {read:false}), {
          ignorePath: '/front-end',
          //addPrefix: '/compiledCss'
        }))
        .pipe(gulp.dest(config.client));
    });
  };
}());
