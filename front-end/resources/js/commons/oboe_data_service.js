(function() {
  'use strict';

  angular
    .module('app.commons')
    .factory('oboe_data_service', oboe_data_service);

    oboe_data_service.$inject = ['$q'];

    function oboe_data_service($q) {
      var service = {
        stream: stream
      };

      return service;

      function stream(options) {
        var deferred = $q.defer();
        return oboe(options)
          .done(function(response) {
            deferred.resolve(response);
            return deferred.promise;
          })
          .fail(function() {
              // we don't got it
          });
      }
    }
}());
