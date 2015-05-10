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
          controller: 'Search as vm',
          reloadOnSearch: false,
          resolve: {/*@ngInject*/
            search: function($location, $q, $rootScope, commonsDataService, elasticsearchServiceApi) {
              if ($location.search().q) {
                $rootScope.search_keyword = $location.search().q;
                $q.all([searchCallback()])
                  .then(function(response) {
                    $rootScope.pageTotal      = parseInt(response[0].data.total);
                    $rootScope.search_result  = response[0].data.hits;
                    $rootScope.p              = $location.search().p;
                    $rootScope.q              = $location.search().q;
                    $rootScope.resultPerPage  =  $rootScope.pageTotal/20;
                    $rootScope.resultPerPage  = new Array(Math.ceil($rootScope.resultPerPage));
                  });
              }

              function searchCallback() {
                return commonsDataService
                  .httpGETQueryParams('search', {keyword:$location.search().q, p: $location.search().p},
                    elasticsearchServiceApi)
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
