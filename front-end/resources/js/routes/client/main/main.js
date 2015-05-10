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

      $rootScope.$watch(function() {
        if ($location.search().q) {
          return $location.search().q;
        }
      }, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            vm.keyword        = $location.search().q;
            searchCallback();
          }
        }, true);

      function search() {
        $location.path('/search').search({q: vm.keyword});
      }

      function searchResult() {
        $location.search('q', vm.keyword);
        $q.all([searchCallback()])
          .then(function(response) {
            $rootScope.search_result = response[0].data;
          });
      }

      function searchCallback() {
        return commonsDataService
          .httpGETQueryParams('search', {keyword:vm.keyword}, elasticsearchServiceApi)
          .then(function(response) {
            return response;
          });
      }

    }
}());
