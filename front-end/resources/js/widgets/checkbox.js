(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('checkBox', checkBox);

    /* @ngInject */
    function checkBox() {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        element.radiocheck('check');
        console.log('radiocheck');
      }
    }
}());
