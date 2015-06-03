(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('toggleNav', toggleNav);

    function toggleNav() {
      var directive = {
        restrict: 'C',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        element.on('click', function() {
          toggleNavi();
        });
      }

      /*========================================
      =            CUSTOM FUNCTIONS            =
      ========================================*/
      function toggleNavi() {
        if ($('.wrapper').hasClass('show-nav')) {
          // Do things on Nav Close
          $('.wrapper').removeClass('show-nav');
        } else {
          // Do things on Nav Open
          $('.wrapper').addClass('show-nav');
        }
      }
    }
}());
