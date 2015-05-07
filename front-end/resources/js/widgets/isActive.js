(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('isActive', isActive);

    /* @ngInject */
    function isActive() {
      var directive = {
        restrict: 'AE',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        element.on('focus', function() {
          $('.is-active').addClass('isActive');
          $('.is-active .fui-search').addClass('search');
        });
        element.on('blur', function() {
          $('.is-active').removeClass('isActive');
          $('.is-active .fui-search').removeClass('search');
        });
      }
    }
}());
