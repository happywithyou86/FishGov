(function() {
  'use strict';

  module.exports = function(gulp, annotate, csso, filter, inject, uglify, useref, util, logger, config) {
    var assets = useref.assets({searchPath:['front-end/resources', 'front-end']});
    var templateCache = config.temp + config.templateCache.file;
    var cssFilter = filter('**/*.css');
    var vendorFilter  = filter('**/vendor.js');
    var appFilter  = filter('**/app.js');
    gulp.task('optimize', ['inject', 'fonts', 'images', 'copy'], function() {
      logger(util, 'Optimizing the js css and html');
      return gulp
        .src(config.index)
        .pipe(inject(gulp.src(templateCache, {read: false}), {
          ignorePath: '/front-end',
          starttag: '<!-- inject:templates:js -->'
        }))
        .pipe(assets)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore())
        .pipe(vendorFilter)
        .pipe(uglify())
        .pipe(vendorFilter.restore())
        .pipe(appFilter)
        .pipe(annotate({add:true}))
        .pipe(uglify())
        .pipe(appFilter.restore())
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest(config.build));
    });
  };
}());
