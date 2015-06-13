(function() {
  'use strict';

  angular
    .module('app.about')
    .run(appRun);

  appRun.$inject = ['routehelper'];
  /*ngInject*/
  function appRun(routehelper) {
    routehelper.configureRoutes(getRoutes());
  }

  function getRoutes() {
    return [{
      state: 'about',
      config: {
        url         :'/about',
        templateUrl : '/client/about/index.html',
        controller  : 'About_us as vm'
      }
    }];
  }
}());
