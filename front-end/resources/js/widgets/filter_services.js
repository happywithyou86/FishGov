(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('filterServices', filterServices);

    filterServices.$inject = ['$rootScope', '$timeout'];

    function filterServices($rootScope, $timeout) {
      var directive = {
        restrict: 'A',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        $rootScope.services = true;
        $rootScope.products = true;
        element.on('click', function() {
          console.log('click');
          if (attrs.filterServices === 'services') {
            $timeout(function() {
              $rootScope.services = !$rootScope.services;
            }, 0);
          } else {
            $timeout(function() {
              $rootScope.products = !$rootScope.products;
            }, 0);
          }
        });
      }
    }
}());
