(function() {
  'use strict';

  angular
    .module('app.commons')
    .factory('commonsDataService', commonsDataService);

    commonsDataService.$inject = ['authToken',  'exception', 'Restangular'];

    /* @ngInject */
    function commonsDataService(authToken, exception, Restangular) {
      var service = {
        httpGETQueryParams    : httpGETQueryParams,
        httpGETRouteParams    : httpGETRouteParams,
        httpPOSTQueryParams   : httpPOSTQueryParams,
        httpPUTQueryParams    : httpPUTQueryParams
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

      function httpGETRouteParams(api, routeParam, queryparam, apiService) {
        return apiService.one(api, routeParam)
          .get(queryparam)
          .then(httpGETRouteParamsCallback)
          .catch(function(message) {

          });

        function httpGETRouteParamsCallback(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }

      function httpPOSTQueryParams(api, param, apiService) {
        return apiService.all(api)
          .post(param)
          .then(httpPOSTQueryParamsCallback)
          .catch(function(message) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher('Error in saving the Farmers Data', message);
          });

        function httpPOSTQueryParamsCallback(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }

      function httpPUTQueryParams(api, param, apiService) {
        return apiService.one(api)
          .put(param)
          .then(httpPUTQueryParamsCallback)
          .catch(function(message) {

          });

        function httpPUTQueryParamsCallback(response, status, header, config) {
          return Restangular.stripRestangular(response);
        }
      }
    }
})();
