(function() {
  'use strict';
  var path = require('path'),
      rootPath = path.normalize(__dirname + '../../../');

  module.exports = function(gulp, karma ) {
    gulp.task('karma', function (done) {
      karma.start({
        configFile: rootPath + 'karma.conf.js',
        singleRun: false
      }, done);
    });
  };
}());
