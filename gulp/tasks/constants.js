(function() {
  'use strict';

  module.exports = function(gulp, ngConstant, util, logger) {
    logger(util, 'Running constants');
    gulp.task('constants', function () {
      var myConfig = require('./util/config.json');
      var envConfig = myConfig[process.env.NODE_ENV];
      return ngConstant({
        name: 'ngConfig',
        constants: envConfig,
        stream: true
      })
      .pipe(gulp.dest('front-end/resources/js/constants'));
    });
  };
}());
