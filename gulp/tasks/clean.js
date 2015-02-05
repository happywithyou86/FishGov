(function() {
  'use strict';

  module.exports = function(del, gulp, util, remove, logger, config) {
    gulp.task('clean-images', function(done) {
      var path = config.build + 'img/**/*.*';
      remove(del, util, logger, path, done);
    });
    gulp.task('clean-fonts', function(done) {
      var path = config.build + 'fonts/**/*.*';
      remove(del, util, logger, path, done);
    });
    gulp.task('clean-stylus', function(done) {
      var path = 'front-end/.tmp/**/*.css';
      remove(del, util, logger, path, done);
    });
    // gulp.task('clean-code',function(done) {
    //   var path = [].concat(
    //     config.build + '**/*.html',
    //     config.build + 'js/**/*.js'
    //
    //   );
    //   remove(del, util, logger, path, done);
    // });
    gulp.task('clean', function(done) {
        var path = [].concat(config.build, config.temp);
        logger(util, 'Cleaning: ' + path);
        remove(del, util, logger, path, done);
    });
    gulp.task('clean-commons', function(done) {
      var path = config.build + 'commons';
      remove(del, util, logger, path, done);
    });
    gulp.task('clean-admin', function(done) {
      var path = config.build + 'admin';
      remove(del, util, logger, path, done);
    });
    gulp.task('clean-client', function(done) {
      var path = config.build + 'client';
      remove(del, util, logger, path, done);
    });
  };
}());
