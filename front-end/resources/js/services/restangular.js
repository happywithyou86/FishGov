(function() {
  'use strict';

  angular.module('app.services')
  .factory('userInfoServiceApi', userInfoServiceApi);

  function userInfoServiceApi(Restangular) {
    return Restangular.all('userApi');
  }
}());
