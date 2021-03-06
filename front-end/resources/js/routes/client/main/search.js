(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Search', Search);

    Search.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$timeout', '$window', '$auth',
    'commonsDataService', 'elasticsearchServiceApi', 'local_storage', 'default_result',
    'oboe_data_service', 'userServiceApi'];

    /*@ngInject*/
    function Search($location, $q, $rootScope, $scope, $state, $timeout, $window, $auth,
    commonsDataService, elasticsearchServiceApi, local_storage, default_result,
    oboe_data_service, userServiceApi) {
      var vm = this;
      vm.clicked_items          = clicked_items;
      vm.searchResult           = searchResult;
      vm.keyword                = $rootScope.search_keyword;
      vm.change_page            = change_page;
      vm.change_keyword         = change_keyword;
      vm.isAuthenticated        = $auth.isAuthenticated();
      $rootScope.watchfilterChangesCounter      = 0;
      $rootScope.watchOptionCounter             = 0;
      $rootScope.watchfilterChangesCounterNull  = 0;
      $rootScope.services_count_check           = 0;
      $rootScope.products_count_check           = 0;

      /*get the photo from local storage*/
      vm.photo = local_storage.getToken('photo');

      $scope.$on('search', function() {
        $timeout(function() {
          search();
        }, 0);
      });

      function clicked_items(item_id, keyword) {
        if (!vm.isAuthenticated){
          return;
        }

        $q.all([save_click_items(item_id)])
          .then(function(response) {
            return response;
          });
      }

      function save_click_items(item_id) {
        return commonsDataService
          .httpPUTQueryParams(
            'clicked_items',
            {item_id:item_id},
            userServiceApi
          ).then(function(response) {
            return response;
          });
      }

      function search() {
        /*saved the search terms link to the isEntered directive*/
        $q.all([saved_keyword()])
          .then(function(response) {
            $location.path('/search').search({q: vm.keyword, p: 1});
          });
      }

      $scope.$watchCollection(function() {
        if ($location.search().p) {
          return parseInt($location.search().p);
        }
      }, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            vm.keyword  = $location.search().q;
            vm.path     = $location.path();
            default_result.get('search', 76);
          }
        }, true);

      $scope.$watchCollection(function() {
        if ($location.search().q) {
          return $location.search().q;
        }
      }, function(newValue, oldValue) {
          vm.keyword = $location.search().q;
          vm.path    = $location.path();
          if (newValue !== oldValue) {
            console.log('watch keyword');
            keyword_search(newValue);
            // if ($location.search().f !==)
            if ($location.search().f === undefined && vm.path.indexOf('item') === -1 &&
              $rootScope.fromStateUrl !== 'search_item' && $rootScope.toStateUrl === 'main') {
                console.log('filter keyword');
                filter_keyword();
            }
          }
        }, true);

      function change_page(page, page_total) {
        if (page === 0 || (page > $rootScope.result)) {return;}
        $rootScope.is_change_page = false;
        $location.path('/search').search('q', $location.search().q).search('p', page);
      }

      function change_keyword(page) {
        if (!vm.isAuthenticated) {
          $rootScope.tempKeyword = vm.keyword;
          $location.search('q', vm.keyword).search('p', page);
        } else {
          $q.all([saved_keyword()])
            .then(function(response) {
              $rootScope.tempKeyword = vm.keyword;
              $location.search('q', vm.keyword).search('p', page);
            });
        }
      }

      function saved_keyword() {
        return commonsDataService
          .httpPUTQueryParams(
            'search_terms',
            {keyword:vm.keyword},
            userServiceApi
          ).then(function(response) {
            return response;
          });
      }

      function searchResult(page) {
        console.log('search_result page');
        $q.all([searchCallback(page)])
          .then(function(response) {
            /*make a new pagination array*/
            $rootScope.paginateResult = [];
            $rootScope.pageTotal = parseInt(response[0].data.total);
            $rootScope.p = page;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = $rootScope.pageTotal/20;
            $rootScope.result = Math.ceil($rootScope.resultPerPage);
            // console.log($rootScope.result);
            var marginal_pagination = 20;
            var url_pagination = $location.search().p;
            var cpagination = 1;
            var end_pagination = 9;
            if ($rootScope.result > 8) {
              if (url_pagination <= marginal_pagination) {
                cpagination = 1;
              } else {
                cpagination = (parseInt(url_pagination) + 1)- marginal_pagination;
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
            $rootScope.is_change_page = false;
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
            $rootScope.dash          = '-';
            $rootScope.of            = 'of';
            $rootScope.search_result = response[0].data.hits;
          });
      }

      //change in keyworkd
      function keyword_search(keyword) {
        console.log('search_result keyword');
        $q.all([searchCallback($location.search().q)])
          .then(function(response) {
            /*change the tempKeyword*/
            $rootScope.tempKeyword = $location.search().q;
            /*make a new pagination array*/
            $rootScope.paginateResult = [];
            $rootScope.pageTotal = parseInt(response[0].data.total);
            $rootScope.p = $location.search().p;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = $rootScope.pageTotal/20;
            $rootScope.result = Math.ceil($rootScope.resultPerPage);
            // console.log($rootScope.result);
            var marginal_pagination = 20;
            var url_pagination = $location.search().p;
            var cpagination = 1;
            var end_pagination = 9;
            if ($rootScope.result > 8) {
              if (url_pagination <= marginal_pagination) {
                cpagination = 1;
              } else {
                cpagination = (parseInt(url_pagination) + 1)- marginal_pagination;
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
            $rootScope.is_change_page = false;
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
            if ($rootScope.pageTotal === 0) {
              $rootScope.services_filter = [];
              $rootScope.products_filter = [];
              $rootScope.noOfServices = 0;
              $rootScope.noOfProducts = 0;
              $rootScope.noResultText = 'No Search Results for ';
            } {
              filter_keyword();
            }
            $rootScope.search_result = response[0].data.hits;
          });
      }
      // asc       : $location.search().asc,
      // filter    : $rootScope.classification || [],
      // option    : $rootScope.option || [],
      // keyword   : $location.search().q,
      // fromPage  : $location.search().p,
      // option_val: {
      //   is_award      : $rootScope.is_award,
      //   is_sole_source: $rootScope.is_sole_source
      // }
      function searchCallback(page) {
        console.log('search');
        return commonsDataService
          .httpGETQueryParams('search', {
            asc: $location.search().asc,
            keyword:vm.keyword,
            p: page,
            option_val: {
              is_award      : $rootScope.is_award,
              is_sole_source: $rootScope.is_sole_source
            }
          }, elasticsearchServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function filter_keyword() {
        $timeout(function() {
          $rootScope.services_filter = [];
          $rootScope.products_filter = [];
          $rootScope.noOfServices = 0;
          $rootScope.noOfProducts = 0;
        }, 0);
        oboe_data_service
          .stream({
            url   : 'filterApi/search/services/keyword',
            method: 'POST',
            body  : {
              keyword: vm.keyword,
            }
          }).node('data.*', function(response) {
            $timeout(function() {
              $rootScope.services_filter.push(response);
            }, 0);
          }).done(function(response) {
            $timeout(function () {
              $rootScope.noOfServices = response.data.length;
            }, 0);
          });

          oboe_data_service
            .stream({
              url   : 'filterApi/search/products/keyword',
              method: 'POST',
              body  : {
                keyword: vm.keyword,
              }
            }).node('data.*', function(response) {
              $timeout(function() {
                $rootScope.products_filter.push(response);
              }, 0);
            }).done(function(response) {
              $timeout(function() {
                $rootScope.noOfProducts = response.data.length;
              }, 0);
            });
      }
    }
}());
