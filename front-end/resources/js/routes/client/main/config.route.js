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
          title: 'Main',
          resolve: {/*@ngInject*/
            total_search: function($q, $rootScope, commonsDataService, elasticsearchServiceApi) {
              $q.all([total_searchCallback()])
                .then(function(response) {
                  console.log(typeof response[0].data.total);
                  $rootScope.totalObj = response[0].data.total;
                });

              function total_searchCallback() {
                return commonsDataService
                  .httpGETQueryParams('total', {}, elasticsearchServiceApi)
                  .then(function(response) {
                    return response;
                  });
              }
            }
          }
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
                    /*make the watch happens once*/
                    $rootScope.refresh_change = true;
                    /*make a new pagination array*/
                    $rootScope.paginateResult = [];
                    $rootScope.pageTotal = parseInt(response[0].data.total);
                    //$rootScope.p = $location.search().p;
                    $rootScope.p = $location.search().p;
                    $rootScope.q = $location.search().q;
                    $rootScope.resultPerPage = $rootScope.pageTotal/20;
                    $rootScope.result = Math.ceil($rootScope.resultPerPage);
                    var marginal_pagination = 20;
                    var url_pagination = $location.search().p;
                    var cpagination = 1;
                    var end_pagination = 9;
                    if ($rootScope.result > 8) {
                      if (url_pagination <= marginal_pagination) {
                        cpagination = 1;
                      } else {
                        cpagination = (parseInt(url_pagination) + 1) - marginal_pagination;
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
                      if ($rootScope.result !== 1) {$rootScope.paginateResult.push(i);}
                    }
                    $rootScope.showStart = (((parseInt($rootScope.p) - 1) * 20) + 1);
                    $rootScope.showEnd   = $rootScope.p * 20;
                    if($rootScope.showEnd > $rootScope.pageTotal) {
                      $rootScope.showEnd = $rootScope.pageTotal;
                    }
                    /*set the previous*/
                    if (parseInt($rootScope.p) !== 1) {
                      $rootScope.previous_hide = true;
                    } else {
                      $rootScope.previous_hide = false;
                    }
                    /*set the next*/
                    if (parseInt($rootScope.p) !== $rootScope.result) {
                      $rootScope.next_hide = true;
                    } else {
                      $rootScope.next_hide = false;
                    }
                    /*set the tempkeyword*/
                    $rootScope.tempKeyword = $location.search().q;
                    $rootScope.dash           = '-';
                    $rootScope.of             = 'of';
                    $rootScope.search_result = response[0].data.hits;
                    console.log($rootScope.search_result);
                  });
              }

              function searchCallback() {
                return commonsDataService
                  .httpGETQueryParams('search', {
                      keyword:$location.search().q,
                      p: $location.search().p,
                      asc: $location.search().asc
                    },
                    elasticsearchServiceApi)
                  .then(function(response) {
                    return response;
                  });
              }
            }
          }
        }
      }, {
        state: 'search_item',
        config: {
          url: '/item/:id',
          templateUrl: '/client/main/item_search.html',
          controller: 'Item_Search as vm',
          title: 'Item Search',
          resolve: {/*@ngInject*/
            search_item: function($location, $q, $rootScope, $stateParams, commonsDataService,
            elasticsearchServiceApi) {
              $q.all([search_itemCallback()])
                .then(function(response) {
                  $rootScope.itemObj = response[0].data.hits[0];
                  $rootScope.item_description = response[0].data.hits[0].highlight.description[0];
                  response[0].data.hits[0].highlight.description[0] = undefined;
                  $rootScope.search_item_result = response[0].data.hits;
                  $rootScope.description = response[0].data.description;
                  console.log($rootScope.itemObj);
                });

              function search_itemCallback() {
                return commonsDataService
                  .httpGETRouteParams('search', $stateParams.id, {keyword: $location.search().keyword},
                    elasticsearchServiceApi)
                  .then(function(response) {
                    return response;
                  });
              }
            }
          }
        }
      }, {
        state: 'user_saved_items',
        config: {
          url : '/save/items',
          templateUrl: '/client/main/user_saved_items.html',
          controller: 'User_Saved_Items as vm',
          title: 'User Saved Items',
          resolve: {/*@ngInject*/
            get_user_saved_items: function($q, $rootScope, commonsDataService, userServiceApi) {
              $q.all([user_saved_items()])
                .then(function(response) {
                  $rootScope.user_saved_items = response[0].data;
                });

              function user_saved_items() {
                return commonsDataService
                  .httpGETQueryParams(
                    'saved_items',
                    {},
                    userServiceApi
                  );
              }
            }
          }
        }
      }];
    }
}());
