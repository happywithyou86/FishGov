(function() {
  'use strict';

  module.exports = function(gulp, args, ifs, print, jshint, jscs, util, handleErrors, logger, config ) {
    gulp.task('jscshint', function() {
      logger(util, 'Analyzing source with JSHINT and JSCS');
      return gulp
        .src(config.alljs)
        .pipe(ifs(args.verbose, print()))
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose:true}))
        .pipe(jshint.reporter('fail'))
        .on('error', handleErrors);
    });
  };
}());
