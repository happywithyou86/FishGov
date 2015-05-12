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
                    /*make a new pagination array*/
                    $rootScope.paginateResult = [];
                    $rootScope.search_result = response[0].data.hits;
                    var pageTotal = parseInt(response[0].data.total);
                    //$rootScope.p = $location.search().p;
                    $rootScope.p = $location.search().p;
                    $rootScope.q = $location.search().q;
                    $rootScope.resultPerPage = pageTotal/5;
                    $rootScope.result = Math.ceil($rootScope.resultPerPage);
                    var marginal_pagination = 5;
                    var url_pagination = $location.search().p;
                    var cpagination = 1;
                    var end_pagination = 9;
                    if ($rootScope.result > 8) {
                      if (url_pagination <= marginal_pagination) {
                        cpagination = 1;
                      } else {
                        cpagination = (url_pagination + 1) - marginal_pagination;
                        end_pagination = cpagination + 8;
                        if (end_pagination > $rootScope.result) {
                          end_pagination = $rootScope.result;
                          cpagination = $rootScope.result - 8;
                        }
                      }
                    } else {
                      end_pagination = $rootScope.result;
                    }
                    for (var i = cpagination; i <= end_pagination; i++) {
                      $rootScope.paginateResult.push(i);
                    }
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
