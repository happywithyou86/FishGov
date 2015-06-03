(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('checkBox', checkBox);

    checkBox.$inject = ['$rootScope', '$timeout'];

    /* @ngInject */
    function checkBox($rootScope, $timeout) {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        $rootScope.classification = [];
        element.radiocheck('check');
        element.on('change.radiocheck', function(event) {
          if (attrs.ngChecked === 'false') {
            attrs.ngChecked = true;
            $rootScope.classification.push(attrs.value);
          } else {
            attrs.ngChecked = false;
            var position = $rootScope.classification.indexOf(attrs.value);
            $rootScope.classification.splice(position, 1);
          }
        });
      }
    }
}());
