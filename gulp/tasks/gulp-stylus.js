(function() {
  'use strict';

  var nib     = require('nib');

  module.exports = function (del, gulp, stylus, prefixer, csslint, util, clean, handleErrors, logger, config) {
    gulp.task('stylus', ['clean-stylus'], function() {
      logger(util, 'Compiling Stylus ---> CSS');
      return gulp.src(config.stylus)
      .pipe(stylus({use: [nib()]}) )
      .on('error', handleErrors)
      .pipe(csslint({
        'gradients': false,
        'important': false,
        'compatible-vendor-prefixes': false,
        'unqualified-attributes': false,
        'box-model': false,
        'display-property-grouping': false,
        'adjoining-classes': false
      }))
      .pipe(csslint.reporter())
      .pipe(prefixer({browsers:['last 2 versions', '> 5%']}))
      .on('error', handleErrors )
      .pipe(gulp.dest('front-end/.tmp/stylus' ));
    });
  };
}());
