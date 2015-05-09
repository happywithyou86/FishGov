(function() {
  'use strict';

  angular
    .module('app.main')
    .run(appRun);

    appRun.$inject = ['routehelper'];
    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'main',
        config: {
          url: '/',
          templateUrl: '/client/main/index.html',
          controller: 'Main as vm',
          title: 'Main'
        }
      }, {
        state: 'search',
        config: {
          url: '/search',
          templateUrl: '/client/main/search.html',
          controller: 'Main as vm',
          resolve: {/*@ngInject*/
            search: function($location, $q, $rootScope, commonsDataService, elasticsearchServiceApi) {
              if ($location.search().q) {
                $q.all([searchCallback()])
                  .then(function(response) {
                    $rootScope.search_result = response[0].data;
                    //console.log($rootScope.search_result);
                    //$rootScope.$broadcast('decode_html', $rootScope.search_result);
                  });
              }

              function searchCallback() {
                return commonsDataService
                  .httpGETQueryParams('search', {keyword:$location.search().q}, elasticsearchServiceApi)
                  .then(function(response) {
                    return response;
                  });
              }
            }
          }
        }
      }];
    }
}());
