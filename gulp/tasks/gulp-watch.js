
  module.exports = function( gulp ) {
    gulp.task( 'watch', function () {
      gulp.watch( 'front-end/resources/css/stylus/app.styl', ['stylus'] )
    })
  }
