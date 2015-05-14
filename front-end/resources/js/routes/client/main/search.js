(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Search', Search);

    Search.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$timeout', '$window',
    'commonsDataService', 'elasticsearchServiceApi'];

    /* @ngInject */
    function Search($location, $q, $rootScope, $scope, $state, $timeout, $window,
    commonsDataService, elasticsearchServiceApi) {
      var vm = this;

      vm.searchResult           = searchResult;
      vm.keyword                = $rootScope.search_keyword;
      vm.change_page            = change_page;
      vm.change_keyword         = change_keyword;
      $rootScope.is_change_page = false;


      $scope.$on('search', function() {
        $timeout(function() {
          search();
        }, 0);
      });

      function search() {
        $location.path('/search').search({q: vm.keyword, p: 1});
      }

      $rootScope.$watchCollection(function() {
        if ($location.search().p) {
          return $location.search().p;
        }
      }, function(newValue, oldValue) {
          if (newValue !== oldValue && $rootScope.is_change_page !== true) {
              $rootScope.is_change_page = !$rootScope.is_change_page;
              vm.keyword = $location.search().q;
              searchResult(newValue);
          }
        });

      $rootScope.$watchCollection(function() {
        if ($location.search().q) {
          return $location.search().q;
        }
      }, function(newValue, oldValue) {
        vm.keyword = $location.search().q;
          if (newValue !== oldValue && $rootScope.is_change_page !== true) {
            $rootScope.is_change_page = !$rootScope.is_change_page;
            keyword_search(newValue);
          }
        }, true);

      function change_page(page, page_total) {
        if (page === 0 || (page > $rootScope.result)) {return;}
        $rootScope.is_change_page = false;
        $location.path('/search').search('q', $location.search().q).search('p', page);
      }

      function change_keyword(page) {
        // vm.is_change_page = true;
        $rootScope.tempKeyword = vm.keyword;
        $location.search('q', vm.keyword).search('p', page);
      }

      function searchResult(page) {
        $q.all([searchCallback(page)])
          .then(function(response) {
            /*make a new pagination array*/
            $rootScope.paginateResult = [];
            $rootScope.pageTotal = parseInt(response[0].data.total);
            $rootScope.p = page;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = $rootScope.pageTotal/5;
            $rootScope.result = Math.ceil($rootScope.resultPerPage);
            // console.log($rootScope.result);
            var marginal_pagination = 5;
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
            $rootScope.showStart = (((parseInt($rootScope.p) - 1) * 5) + 1);
            $rootScope.showEnd   = $rootScope.p * 5;
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
        console.log(vm.keyword);
        $q.all([searchCallback($location.search().q)])
          .then(function(response) {
            /*make a new pagination array*/
            $rootScope.paginateResult = [];
            $rootScope.pageTotal = parseInt(response[0].data.total);
            $rootScope.p = $location.search().p;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = $rootScope.pageTotal/5;
            $rootScope.result = Math.ceil($rootScope.resultPerPage);
            // console.log($rootScope.result);
            var marginal_pagination = 5;
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
            $rootScope.showStart = (((parseInt($rootScope.p) - 1) * 5) + 1);
            $rootScope.showEnd   = $rootScope.p * 5;
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
            $rootScope.search_result = response[0].data.hits;
          });
      }

      function searchCallback(page) {
        return commonsDataService
          .httpGETQueryParams('search', {keyword:vm.keyword, p: page}, elasticsearchServiceApi)
          .then(function(response) {
            return response;
          });
      }

    }
}());
