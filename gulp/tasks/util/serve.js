(function() {
  'use strict';

  module.exports = function(isDev, args, gulp, browserSync, nodemon, util, logger, config) {
    var port = process.env.PORT || config.defaultPort;
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
          logger(util, '*** Nodemon Restarted');
          logger(util, '*** Files Changed on Restart:\n' + ev);
          setTimeout(function() {
            browserSync.notify('Reloading BrowserSync now...');
            browserSync.reload({stream: false});
            browserSync.reload();
          }, 2000);
        })
        .on('start', function() {
          logger(util, '*** nodemon started');
          setTimeout(function() {
            startBrowserSync(args, browserSync, gulp, util, logger, config);
          }, 3000);
        })
        .on('crash', function() {
          logger(util, '*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
          logger(util, '*** nodemon exited cleanly');
        });

  };

  function startBrowserSync(args, browserSync, gulp, util, logger, config) {
    var options = {
      proxy: 'localhost:' + config.defaultPort,
      port: 3001,
      files: [config.client + '**/*.*', config.css],
      ghostMode: {
        click: true,
        location: false,
        forms: true,
        scroll: true,
      },
      injectChanges: true,
      logFileChanges: true,
      logLevel: 'debug',
      logPrefix: 'gulp-patterns',
      notify: true,
      reloadDelay: 1000
    };
    if(args.nosync || browserSync.active) {return;}
    logger(util, 'Starting browser-sync on port ' + config.defaultPort);
    gulp.watch([config.stylus], ['stylus'])
      .on('change', function(event) { changeEvent(event, util, logger, config); });
    browserSync(options);
  }

  function changeEvent(event, util, logger, config) {
    var srcPattern = new RegExp('/.*(?=/)/');
    logger(util, 'File ' + event.path.replace(srcPattern, '')+ ' ' + event.type  );
  }
}());
