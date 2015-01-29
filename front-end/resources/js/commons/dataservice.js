(function() {
  'use strict';

  angular
    .module('app.commons')
    .factory('commonsDataService', commonsDataService);

    commonsDataService.$inject = [ 'authToken', 'userInfoServiceApi', 'exception' ];

    function commonsDataService( authToken, userInfoServiceApi, exception ) {
      var service = {
        authorize : authorize,
        checkEmail: checkEmail
      };
      return service;

      function authorize() {
        var token = authToken.getToken();
        return userInfoServiceApi.one( 'userInfo' )
          .get( {token:token} )
          .then( authorizeCallBack )
          .catch(function( message ) {

          });

        function authorizeCallBack( response, statuse, header, config ) {
          return response.data;
        }
      }

      function checkEmail( api, param ) {
        return userInfoServiceApi.one( api )
          .get( param )
          .then( checkEmailCallBack )
          .catch(function( message ) {
            /***
            ** Call the exception factory to show the error in the client for Development
            ** then wait for 5 seconds then redirect
            ***/
            exception.catcher( 'Error in checking email name on all the list of User Data', message );
          });

        function checkEmailCallBack( response, status, header, config ) {
          return response;
        }
      }
    }
})();
