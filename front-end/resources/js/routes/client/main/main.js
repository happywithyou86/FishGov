(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Main', Main);

    Main.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$timeout', '$window',
    'commonsDataService', 'elasticsearchServiceApi'];

    /* @ngInject */
    function Main($location, $q, $rootScope, $scope, $state, $timeout, $window,
    commonsDataService, elasticsearchServiceApi) {
      var vm = this;

      vm.search         = search;
      vm.search_result  = [];
      vm.searchResult   = searchResult;
      vm.keyword        = $rootScope.search_keyword;
      vm.index          = null;

      function search() {
        $location.path('/search').search({q: vm.keyword, p: 1});
      }

      $rootScope.$watch(function() {
        if ($location.search().p) {
          return $location.search().p;
        }
      }, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            vm.keyword = $location.search().q;
            searchResult(newValue);
          }
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

      //change in page
      function searchResult(page) {
        //vm.index = index;
        $q.all([searchCallback(page)])
          .then(function(response) {
            $location.search('q', vm.keyword).search('p', page);
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
