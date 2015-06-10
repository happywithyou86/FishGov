(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('filterServices', filterServices);

    filterServices.$inject = ['$location', '$rootScope', '$timeout'];

    function filterServices($location, $rootScope, $timeout) {
      var directive = {
        restrict: 'A',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        $rootScope.services = true;
        $rootScope.products = true;

        $rootScope.isServicesSelectedAll = false;
        $rootScope.isProductsSelectedAll = false;
        element.on('click', function() {
          $location.search().p = 1;
          if (attrs.filterServices === 'all_services') {
            if ($rootScope.isServicesSelectedAll !== true) {
              $timeout(function() {
                $rootScope.$broadcast('services', {
                  bool: true,
                  length: $rootScope.classification.length,
                  f_location: $location.search().f
                });
                $rootScope.isServicesSelectedAll = !$rootScope.isServicesSelectedAll;
              }, 0);
            } else {
              $timeout(function() {
                $rootScope.$broadcast('services', {
                  bool: false,
                  length: $rootScope.classification.length,
                  f_location: $location.search().f
                });
                $rootScope.isServicesSelectedAll = !$rootScope.isServicesSelectedAll;
              }, 0);
            }
            return;
          }

          if (attrs.filterServices === 'all_products') {
            if ($rootScope.isProductsSelectedAll !== true) {
              $timeout(function() {
                $rootScope.$broadcast('products', {
                  bool: true,
                  length: $rootScope.classification.length,
                  f_location: $location.search().f
                });
                $rootScope.isProductsSelectedAll = !$rootScope.isProductsSelectedAll;
              }, 0);
            } else {
              $timeout(function() {
                $rootScope.$broadcast('products', {
                  bool: false,
                  length: $rootScope.classification.length,
                  f_location: $location.search().f
                });
                $rootScope.isProductsSelectedAll = !$rootScope.isProductsSelectedAll;
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
