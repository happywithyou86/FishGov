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
      function search() {
        $window.location.href = '/search?q=' + vm.keyword;

        // $q.all([searchCallback()])
        //   .then(function(response) {
        //     $rootScope.search_result = response[0].data;
        //     console.log($rootScope.search_result);
        //     vm.bindHtml = '<span>jories</span>';
        //     $rootScope.$broadcast('decode_html', $rootScope.search_result);
        //   });
      }

      function searchResult() {
        console.log('yes');
        $location.search('q', vm.keyword);
        $q.all([searchCallback()])
          .then(function(response) {

            $rootScope.search_result = response[0].data;
            //console.log($rootScope.search_result);
            //$rootScope.$broadcast('decode_html', $rootScope.search_result);
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
