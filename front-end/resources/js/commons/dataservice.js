(function() {
  'use strict';

  angular
    .module('app.commons')
    .factory('commonsDataService', commonsDataService);

    commonsDataService.$inject = ['authToken',  'exception', 'Restangular'];

    /* @ngInject */
    function commonsDataService(authToken, exception, Restangular) {
      var service = {
        httpGETQueryParams    : httpGETQueryParams
      };
      return service;

      function httpGETQueryParams(api, queryParam, apiService) {
        return apiService.one(api)
          .get(queryParam)
          .then(httpGETQueryParamsCallback)
          .catch(function(message) {

          });

        function httpGETQueryParamsCallback(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }
    }
})();
