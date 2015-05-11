(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('isEntered', isEntered);

    /* @ngInject */
    function isEntered() {
      var directive = {
        restrict: 'A',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        element.keypress(function(event) {
          if (event.which === 13) {
            scope.$broadcast(attrs.isEntered);
          }
        });
      }
    }
}());
