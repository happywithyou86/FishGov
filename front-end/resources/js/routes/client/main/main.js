(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Main', Main);

    Main.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$timeout', '$window',
    'commonsDataService', 'elasticsearchServiceApi', 'userServiceApi'];

    /* @ngInject */
    function Main($location, $q, $rootScope, $scope, $state, $timeout, $window,
    commonsDataService, elasticsearchServiceApi, userServiceApi) {
      var vm = this;

      vm.search         = search;
      vm.search_result  = [];
      vm.keyword        = $rootScope.search_keyword;
      vm.index          = null;

      $scope.$on('search', function() {
        $timeout(function() {
          search();
        }, 0);
      });

      function search() {
        console.log(vm.keyword);
        $q.all([saved_keyword()])
          .then(function(response) {
            console.log(response);
          });
        //$location.path('/search').search({q: vm.keyword, p: 1});
      }

      function saved_keyword() {
        return commonsDataService
          .httpPOSTQueryParams(
            'search_terms',
            {keyword:vm.keyword},
            userServiceApi
          ).then(function(response) {
            return response;
          });
      }

    }
}());
