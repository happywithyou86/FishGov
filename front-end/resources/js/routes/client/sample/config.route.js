(function() {
  'use strict';

  angular
    .module('app.sample')
    .run(appRun);

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'sample',
        config: {
          url: '/welcome',
          templateUrl: '/client/sample/welcome.html',
          controller: 'Sample as vm',
          title: 'Sample'
        }
      }];
    }
})();
