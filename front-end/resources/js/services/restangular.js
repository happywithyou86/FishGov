(function(){
  'use strict';

  angular.module('app.services')
  .factory( 'userInfoServiceApi', function ( Restangular ) {
    return Restangular.all( 'userApi' );
  });
}());
