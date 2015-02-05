(function() {
  'use strict';

  angular.module('app.services')
  .factory('userInfoServiceApi', userInfoServiceApi);

  userInfoServiceApi.$inject = ['Restangular'];

  function userInfoServiceApi(Restangular) {
    return Restangular.all('userApi');
  }
}());
