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

        var all_services = false;
        element.on('click', function() {
          if (attrs.filterServices === 'all_services') {
            if (all_services === false) {
              $timeout(function() {
                $rootScope.check_services = true;
                all_services = true;
              }, 0);
            } else {
              $timeout(function() {
                $rootScope.check_services = false;
              }, 0);
            }
            return;
          }

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
