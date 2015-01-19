(function(){
  'use strict';

  angular.module('app.restangular', [])
  .factory( 'ServiceRestangularName', function ( Restangular ) {
    return Restangular.all( 'RestApiName' );
  });
}());
