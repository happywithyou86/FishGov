(function() {
  'use strict';

  module.exports = function(gulp, minifyHtml, templateCache, util, logger, config) {
    gulp.task('templatecache', function() {
      logger(util, 'Creating AngularJs TemplateCache');
      return gulp
        .src(config.htmlTemplates)
        .pipe(minifyHtml({empty: true}))
        .pipe(templateCache(
          config.templateCache.file,
          config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
    });
  };
}());
// ['clean']
