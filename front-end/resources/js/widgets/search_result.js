(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('searchResult', searchResult);

    function searchResult() {
      var directive = {
        restrict: 'A',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        var height = element.outerHeight();
        console.log(height);
        scope.$watch(function () {
          return element.offsetHeigh;
          }, function (newValue, oldValue) {
            if (newValue !== oldValue) {
              // Do something ...
              console.log(newValue);
            }
          });
      }
    }
}());
