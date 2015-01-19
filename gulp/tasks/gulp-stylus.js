(function() {
  'use strict';

  var nib     = require('nib');

  module.exports = function ( gulp, stylus, prefixer, csslint, handleErrors ) {
    gulp.task('stylus', function () {
      return gulp.src( 'front-end/resources/css/stylus/app.styl' )
      .pipe( stylus({use: [nib()]}) )
      .pipe(csslint({
        'gradients': false,
        'important': false,
        'compatible-vendor-prefixes': false,
        'unqualified-attributes': false,
        'box-model': false,
        'display-property-grouping': false
      }))
      .pipe(csslint.reporter())
      .pipe(prefixer())
      .on( 'error', handleErrors )
      .pipe(gulp.dest( 'front-end/.tmp/stylus' ));
    });
  };
}());
