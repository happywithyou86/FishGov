(function() {
  'use strict';

  module.exports = function() {
    var config = {
      adminRoutes: 'front-end/views/admin/**/*.*',

      alljs: [
        'front-end/resources/js/**/*.js',
        './*.js',
        'back-end/**/*.js'
      ],
      build: './build/',
      client: 'front-end/views/',
      clientRoutes: 'front-end/views/client/**/*.*',
      commons: 'front-end/views/commons/**/*.*',
      css: 'front-end/.tmp/stylus/app.css',
      fonts: ['front-end/resources/fonts/**/*.*', 'front-end/bower/bootstrap/fonts/*.*',
        'front-end/bower/ionicons/fonts/*.*', 'front-end/bower/flat-ui/fonts/**/*.*'],
      htmlTemplates: 'front-end/views/**/*.html',
      images: 'front-end/resources/img/**/*.*',
      index: 'front-end/views/index.html',
      js: [
        'front-end/resources/js/**/*.module.js',
        'front-end/resources/js/**/*.js'
      ],
      stylus: 'front-end/resources/css/stylus/app.styl',
      server: './back-end',
      temp: 'front-end/.tmp/',
      templateCache: {
        file: 'templates.js',
        options: {
          module: 'app.core',
          standalone: false,
        }
      },
      /*Bower and Npm Configurations*/
      bower: {
        json: require('./bower.json'),
        directory: '.bowerrc'.directory,
        exclude: ['..bower/bootstrap/dist/js/bootstrap.js'],
        ignorePath: '../bower',
        fileTypes: {
          html: {
            replace: {
              js: '<script src="/bower{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/bower{{filePath}}" />'
            }
          }
        }
      },
      /* Node Server*/
      defaultPort: 3000,
      nodeServer: './back-end/server.js'
    };

    config.getWireDepDefaultOptions = function() {
      var options = {
        bowerJson: config.bower.json,
        directory: config.bower.directory,
        exclude: config.bower.exclude,
        ignorePath: config.bower.ignorePath,
        fileTypes: config.bower.fileTypes
      };
      return options;
    };
    return config;
  };
}());
