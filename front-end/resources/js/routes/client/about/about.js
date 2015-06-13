(function() {
  'use strict';

  angular
    .module('app.about')
    .controller('About_us', About_us);

    function About_us() {
      var vm = this;

      vm.stop_doing   = stop_doing;
      vm.start_doing  = start_doing;
      vm.keep_doing   = keep_doing;

      function stop_doing() {
        
      }

      function start_doing() {

      }

      function keep_doing() {

      }
    }
}());
