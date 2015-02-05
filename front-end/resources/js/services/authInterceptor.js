(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['authToken'];

    /* @ngInject */
    function authInterceptor(authToken) {
      return {
        request: function(config) {
          var token = authToken.getToken();
          if (token) {config.headers.Authorization = 'Bearer ' + token;}
          return config;
        },
        response: function(response) {
          return response;
        }
      };
    }
}());
