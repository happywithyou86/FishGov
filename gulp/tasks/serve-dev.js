(function() {
  'use strict';


  module.exports = function(gulp, nodemon, util, logger, config) {
    gulp.task('serve-dev', ['inject'], function() {
      logger(util, 'Running Dev Server');

      var port = process.env.PORT || config.defaultPort;
      var isDev = true;

      var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
          'PORT': port,
          'NODE_ENV': isDev ? 'development': 'production'
        },
        watch: [config.server]
      };

      return nodemon(nodeOptions)
          .on('restart', function(ev) {
            logger(util, '*** nodemon restarted');
            logger(util, 'files changed on restart:\n' + ev);
          })
          .on('start', function() {
            logger(util, '*** nodemon started');
          })
          .on('crash', function() {
            logger(util, '*** nodemon crashed: script crashed for some reason');
          })
          .on('exit', function() {
            logger(util, '*** nodemon exited cleanly');
          });
    });
  };
})();
