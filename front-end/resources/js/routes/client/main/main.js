(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Main', Main);

    Main.$inject = ['$q', '$rootScope', '$scope', '$timeout', '$window',
    'commonsDataService', 'elasticsearchServiceApi'];

    /* @ngInject */
    function Main($q, $rootScope, $scope, $timeout, $window,
    commonsDataService, elasticsearchServiceApi) {
      var vm = this;

      vm.search         = search;
      vm.search_result  = [];
      vm.keyword        = $rootScope.search_keyword;
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

      function searchCallback() {
        return commonsDataService
          .httpGETQueryParams('search', {keyword:vm.keyword}, elasticsearchServiceApi)
          .then(function(response) {
            return response;
          });
      }

    }
}());
