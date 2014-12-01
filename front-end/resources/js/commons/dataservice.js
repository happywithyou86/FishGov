(function() {
  'use strict';

  angular
    .module('commons.control')
    .factory('commonsDataservice', commonsDataservice)

    commonsDataservice.$inject = ['isserviceAdminApiLogin', 'isStudentLogin', 'serviceAdminApi']

    function commonsDataservice( isserviceAdminApiLogin, isStudentLogin, serviceAdminApi ) {
      var service = {
        getserviceAdminApiLoginStatus   : getserviceAdminApiLoginStatus,
        createserviceAdminApiAccount    : createserviceAdminApiAccount,
        getStudentLoginStatus            : getStudentLoginStatus,
        adminLogin                       : adminLogin,
        adminLogout                      : adminLogout

      }

      return service;

      function getserviceAdminApiLoginStatus( api, param ) {
        return isserviceAdminApiLogin.one( api ).get( param )
          .then( getserviceAdminApiLoginStatusData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getserviceAdminApiLoginStatusData( data, status, headers, config ) {
          return data;
        }
      }

      function getStudentLoginStatus( api, param ) {
        return isStudentLogin.one( api ).get( param )
          .then( getStudentLoginStatusData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getStudentLoginStatusData( data, status, headers, config ) {
          return data;
        }
      }

      function adminLogout( api, param ) {
        return serviceAdminApi.all( api ).post()
          .then( adminLogout )
          .catch( function (message ) {
            $location.url( '/' )
          })

        function adminLogout( data, status, headers, config ) {
          return data.response;
        }
      }

      function createserviceAdminApiAccount( api, param ) {
        return serviceAdminApi.all( api ).post( param )
          .then( adminAccount )
          .catch(function( message ) {
            $location.url( '/' )
          })

        function adminAccount( data, status, headers, config ) {
          return data.response;
        }
      }

      function adminLogin( api, param ) {
        return serviceAdminApi.all( api )
          .post( param )
          .then( adminLoginData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function adminLoginData( data, status, headers, config ) {
          return data.response;
        }
      }
    }
})()
