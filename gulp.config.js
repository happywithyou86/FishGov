(function() {
  'use strict';

  module.exports = function() {
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];
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
      specHelpers: ['front-end/test-helpers/*.js'],
      serverIntegrationSpecs: ['front-end/tests/server-integration/**/*.spec.js'],
      /* Node Server*/
      defaultPort: 3004,
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

    config.karma = getKarmaOptions();

    return config;

    function getKarmaOptions() {
      var options = {
        files: [].concat(
          bowerFiles,
          config.specHelpers,
          'front-end/resources/js/**/*.module.js',
          'front-end/resources/js/**/*.js',
          'front-end/.tmp/templates.js'
          //config.serverIntegrationSpecs
        ),
        exclude: [],
        coverage: {
          dir: './report/coverage',
          reporters: [
            {type: 'html', subdir: 'report-html'},
            {type: 'lcov', subdir: 'report-lcov'},
            {type: 'text-summary'}
          ]
        },
        preprocessors: {

        }
      };
      options.preprocessors['front-end/' + '**/!(*.spec)+(.js)'] = ['coverage'];
      return options;
    }
  };
}());
