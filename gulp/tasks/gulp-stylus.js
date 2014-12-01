
  var nib     = require('nib');

  module.exports = function ( gulp, stylus, handleErrors ) {
    gulp.task('stylus', function () {
      return gulp.src( 'front-end/resources/css/stylus/app.styl' )
        .pipe( stylus({use: [nib()]}) )
        .on( 'error', handleErrors )
        .pipe(gulp.dest( 'front-end/.tmp/stylus' ))
    })
  }
