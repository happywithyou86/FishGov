(function() {
    'use strict';

    angular
      .module('blocks.router')
      .provider('routehelperConfig', routehelperConfig)
      .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$q', '$state', '$timeout', '$window',
      'logger', 'routehelperConfig'];

    function routehelperConfig() {
      /* jshint validthis:true */
      this.config = {
          // These are the properties we need to set
          // $routeProvider: undefined
          // docTitle: ''
          // resolveAlways: {ready: function(){ } }
      };

      this.$get = function() {
          return {
              config: this.config
          };
      };
    }

    function routehelper( $location, $rootScope, $q, $state, $timeout, $window,
      logger, routehelperConfig ) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };

        var $stateProvider = routehelperConfig.config.$stateProvider;
        var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider;

        var service = {
            configureRoutes: configureRoutes
        };

        init();

        return service;

        function configureRoutes(routes) {
          routes.forEach(function(route) {
              route.config.resolve =
                  angular.extend( route.config.resolve || {}, routehelperConfig.config.resolveAlways );
              $stateProvider.state( route.state, route.config );
          });
          $urlRouterProvider.otherwise('/');
        }

        function handleRoutingErrors() {
          /***
           ** Route cancellation
           ***/
          $rootScope.$on('$stateChangeError',
            function(event, current, previous, rejection) {
              if (handlingRouteChangeError) {
                  return;
              }
              routeCounts.errors++;
              handlingRouteChangeError = true;
              var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                  'unknown target';
              var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
              logger.warning(msg, [current]);
              $location.path('/');
            }
          );
        }

        function init() {
          handleRoutingErrors();
          updateDocTitle();
        }

        function updateDocTitle() {
          $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
              routeCounts.changes++;
              handlingRouteChangeError = false;
              var title = routehelperConfig.config.docTitle + ' ' + (toState.title || '');
              $rootScope.title = title;
            }
          );
        }
    }
})();
