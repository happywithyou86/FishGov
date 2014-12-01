(function() {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

     toastr.options = {
         "positionClass" : "toast-bottom-right"
     }

    function logger($log, toastr) {
        var service = {
            showToasts: false,

            error   : error,
            info    : info,
            success : success,
            warning : warning,

            // straight to console; bypass toastr
            log     : $log.log
        };

        return service;
        /////////////////////
        var toastr = false;

        function error(message, data, title) {
            if( service.showToasts != false ) {
              toastr.error(message, title);
              $log.error('Error: ' + message, data);
            }
        }

        function info(message, data, title) {
            if( service.showToasts != false ) {
              toastr.info(message, title);
              $log.info('Info: ' + message, data);
            }
        }

        function success(message, data, title) {
          if( service.showToasts != false ) {
            toastr.success(message, title);
            $log.info('Success: ' + message, data);
          }
        }

        function warning(message, data, title) {
          if( service.showToasts != false ) {
            toastr.warning(message, title);
            $log.warn('Warning: ' + message, data);
          }
        }
    }
}());
