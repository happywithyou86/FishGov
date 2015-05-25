(function() {
  'use strict';

  angular.module('app.services')
  /*ngInject*/
  .factory('userInfoServiceApi', ['Restangular', function (Restangular) {
    return Restangular.all('userApi');
  }])
  /*ngInject*/
  .factory('userServiceApi', ['Restangular', function (Restangular) {
    return Restangular.all('userApi');
  }])
  /*ngInject*/
  .factory('elasticsearchServiceApi', ['Restangular', function(Restangular) {
    return Restangular.all('elasticsearchApi');
  }]);
}());
