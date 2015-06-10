(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('isEntered', isEntered);

    isEntered.$inject = ['$rootScope'];

    /* @ngInject */
    function isEntered($rootScope) {
      var directive = {
        restrict: 'A',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        element.keypress(function(event) {
          if (event.which === 13) {
            $rootScope.isServicesSelectedAll      = false;
            $rootScope.isProductsSelectedAll      = false;
            $rootScope.watchfilterChangesCounter  = 0;
            $rootScope.watchfilterChangesCounterNull         = 0;
            scope.$broadcast(attrs.isEntered);
          }
        });
      }
    }
}());
