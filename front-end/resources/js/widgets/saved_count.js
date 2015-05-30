(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('savedCount', savedCount);

    savedCount.$inject = ['$rootScope', '$auth', 'local_storage'];

    /* @ngInject */
    function savedCount($rootScope, $auth, local_storage) {
      var directive = {
        restrict: 'A',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var isAuthenticated = $auth.isAuthenticated();
        if (!isAuthenticated) {
          return;
        }

        $rootScope.saved_count = JSON.parse(local_storage.getToken('saved_items'));
        $rootScope.saved_count = $rootScope.saved_count.length;
      }
    }
}());
