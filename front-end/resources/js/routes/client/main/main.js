(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Main', Main);

    Main.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$timeout', '$window',
    '$auth', 'commonsDataService', 'elasticsearchServiceApi', 'userServiceApi'];

    /* @ngInject */
    function Main($location, $q, $rootScope, $scope, $state, $timeout, $window,
    $auth, commonsDataService, elasticsearchServiceApi, userServiceApi) {
      var vm = this;

      vm.isAuthenticated  = $auth.isAuthenticated();
      vm.search           = search;
      vm.search_result    = [];
      vm.keyword          = $rootScope.search_keyword;
      vm.index            = null;

      $scope.$on('search', function() {
        $timeout(function() {
          search();
        }, 0);
      });

      function search() {
        /*test if the user is authenticated*/
        /*so that saved items is not saved in the database*/
        if (!vm.isAuthenticated) {
          $location.path('/search').search({q: vm.keyword, p: 1});
        } else {
          $q.all([saved_keyword()])
            .then(function(response) {
              $location.path('/search').search({q: vm.keyword, p: 1});
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

    }
}());
