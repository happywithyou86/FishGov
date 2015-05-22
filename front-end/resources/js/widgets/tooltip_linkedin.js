(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('tooltipLinkedIn', tooltipLinkedIn);

    tooltipLinkedIn.$inject = ['$tooltip'];
    /* @ngInject */
    function tooltipLinkedIn($tooltip) {
      var directive = {
        restrict: 'AE',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var myTooltip = $tooltip(element, {
          title: 'Login with your LinkedIn account',
          placement: 'bottom',
          container: 'body'
        });
      }
    }
}());
