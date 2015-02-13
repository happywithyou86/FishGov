(function() {
  'use strict';

  module.exports = function(gulp, util, logger, config) {
    gulp.task('test', ['jscshint', 'templatecache'], function(done) {
      startTest(true, done, util, logger, config);
    });
  };
  function startTest(singleRun, done, util, logger, config) {
    var karma = require('karma').server;
    var excludeFiles = [];
    var serverSpecs = config.serverIntegrationSpecs;
    var path = require('path');
    var dirName = path.normalize(__dirname + '../../../');

    excludeFiles = serverSpecs;

    karma.start({
      configFile: dirName + 'karma.conf.js',
      exclude: excludeFiles,
      singleRun: !!singleRun
    }, karmaCompleted);

    function karmaCompleted(karmaResult) {
      logger(util, 'Karma Completed');

      if (karmaResult === 1) {
        done('karma: tests failed with code ' + karmaResult);
      } else {
        done();
      }
    }
  }
}());
