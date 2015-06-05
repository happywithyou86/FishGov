(function() {
  'use strict';

  angular
      .module('blocks.logger')
      .factory('browser', browser);

    browser.$inject = ['toastr'];

  /*@ngInject*/
  function browser(toastr) {
      var service = {
          warning : warning,
      };

      return service;

      function warning(message, title) {
        toastr.warning(message, title);
      }
  }
}());
