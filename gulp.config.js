(function() {
  'use strict';

  module.exports = function() {
    var config = {
      alljs: [
        'front-end/resources/js/**/*.js',
        './*.js',
        'back-end/**/*.js'
      ],
      client: 'front-end/views',
      index: 'front-end/views/index.html',
      js: [
        'front-end/resources/js/**/*.module.js',
        'front-end/resources/js/**/*.js'
      ],
      css: 'front-end/.tmp/stylus/app.css',
      stylus: 'front-end/resources/css/stylus/app.styl',
      server: './back-end',
      /*Bower and Npm Configurations*/
      bower: {
        json: require('./bower.json'),
        directory: '.bowerrc'.directory,
        exclude: ['..bower/bootstrap/dist/js/bootstrap.js'],
        ignorePath: '../bower',
        fileTypes: {
          html: {
            replace: {
              js: '<script src="/bowerComponents{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="/bowerComponents{{filePath}}" />'
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
