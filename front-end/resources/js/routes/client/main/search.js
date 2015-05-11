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

      vm.searchResult   = searchResult;
      vm.keyword        = $rootScope.search_keyword;
      vm.change_page    = change_page;
      vm.change_keyword = change_keyword;

      $rootScope.$watchCollection(function() {
        if ($location.search().p) {
          return $location.search().p;
        }
      }, function(newValue, oldValue) {
            // console.log(oldValue);

            if (newValue !== oldValue) {
              console.log('temp value: ' + vm.temp_new_value );
              console.log('newValue: ' + newValue);
              vm.keyword = $location.search().q;
              searchResult(newValue, newValue);
            }
          // }
        }, true);

      $rootScope.$watch(function() {
        if ($location.search().q) {
          return $location.search().q;
        }
      }, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            vm.keyword = $location.search().q;
            keyword_search(newValue);
          }
        }, true);

      function change_page(page) {
        $location.search('q', $location.search().q).search('p', page);
      }

      function change_keyword(page) {
        $location.search('q', vm.keyword).search('p', page);
      }
      //change in page


      function searchResult(page, newValue) {
        console.log('jories');
        $q.all([searchCallback(page)])
          .then(function(response) {
            $rootScope.search_result = response[0].data.hits;
            vm.pageTotal = parseInt(response[0].data.total);
            //$rootScope.p = $location.search().p;
            $rootScope.p = page;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = vm.pageTotal/20;
            $rootScope.resultPerPage = new Array(Math.ceil($rootScope.resultPerPage));
            vm.main_search_is_click = false;
          });
      }

      //change in keyworkd
      function keyword_search(keyword) {
        $q.all([searchCallback($location.search().q)])
          .then(function(response) {
            $location.search('q', keyword).search('p', $location.search().p);
            $rootScope.search_result = response[0].data.hits;
            vm.pageTotal = parseInt(response[0].data.total);
            //$rootScope.p = $location.search().p;
            $rootScope.p = $location.search().p;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = vm.pageTotal/20;
            $rootScope.resultPerPage = new Array(Math.ceil($rootScope.resultPerPage));
            vm.main_search_is_click = false;
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
