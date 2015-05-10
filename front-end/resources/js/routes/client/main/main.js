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
      vm.keyword        = $rootScope.search_keyword;
      vm.searchResult   = searchResult;
      $rootScope.urlForm        = urlForm;

      function urlForm(index) {
        console.log(index);
      }

      $rootScope.$watch(function() {
        if ($location.search().q) {
          return $location.search().q;
        }
      }, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            vm.keyword = $location.search().q;
            searchResult();
          }
        }, true);

      function search() {
        $location.path('/search').search({q: vm.keyword});
      }

      function searchResult() {
        $q.all([searchCallback()])
          .then(function(response) {
            $rootScope.search_result = response[0].data.hits;
            vm.pageTotal = parseInt(response[0].data.total);
            //$rootScope.pageTotal = new Array(parseInt(response[0].data.total));
            $rootScope.p = $location.search().p;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = vm.pageTotal/20;
            $rootScope.resultPerPage = new Array(Math.ceil($rootScope.resultPerPage));
            $location.search('q', vm.keyword).search('p', '1');
          });
      }

      function searchCallback() {
        return commonsDataService
          .httpGETQueryParams('search', {keyword:vm.keyword, p: 1}, elasticsearchServiceApi)
          .then(function(response) {
            return response;
          });
      }

    }
}());
