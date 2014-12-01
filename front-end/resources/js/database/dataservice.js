(function() {
  'use strict';

  angular
    .module('app.database')
    .factory( 'databaseDataservice', databaseDataservice )

    databaseDataservice.$inject = ['serviceDatabaseApi', '$location', '$rootScope', '$q', 'logger']

    function databaseDataservice( serviceDatabaseApi, $location, $rootScope, $q, logger ) {

      var service = {
        getserviceAdminApiDatabase : getserviceAdminApiDatabase
      }

      return service;

      function getserviceAdminApiDatabase( api ) {
        return serviceDatabaseApi.get( api )
          .then( getserviceAdminApiDatabaseData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getserviceAdminApiDatabaseData(data, status, headers, config) {
          return data;
        }
      }
    }
})()
