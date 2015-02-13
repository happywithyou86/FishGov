(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('tabSwitches', tabSwitches);

    /* @ngInject */
    function tabSwitches() {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        element.bootstrapSwitch('onSwitchChange', function() {
          var switchObj = $('[data-toggle="switch"]');
          for (var i = 0; i <= 2; i++) {
              if (switchObj[i] !== this) {
                if ($(this).bootstrapSwitch('state') !== false) {
                  $(switchObj[i]).bootstrapSwitch('disabled', true);
                }
                else {
                  $(switchObj[i]).bootstrapSwitch('disabled', false);
                }
              }
            }
        });
      }
    }
}());
