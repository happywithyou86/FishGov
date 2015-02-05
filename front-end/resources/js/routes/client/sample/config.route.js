(function() {
  'use strict';

  angular
    .module('app.sample')
    .run(appRun);

    appRun.$inject = ['routehelper'];
    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'sample',
        config: {
          url: '/sample',
          templateUrl: '/client/sample/index.html',
          controller: 'Sample as vm',
          title: 'Sample',
          resolve: {/* @ngInject */
            flatUi: function(viewContentLoaded) {
              viewContentLoaded.carouselScript();
            }
          }
        }
      }];
    }
})();
