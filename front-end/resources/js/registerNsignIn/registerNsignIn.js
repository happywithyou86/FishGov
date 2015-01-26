(function() {
  'use strict';

  angular
    .module( 'app.registerNsignIn' )
    .controller( 'RegisterNSignIn',  RegisterNSignIn );

    RegisterNSignIn.$inject = [ '$q','$timeout', '$auth', '$rootScope', 'authToken',
    'strapAlert', 'strapModal', 'commonsDataService' ];

    function RegisterNSignIn( $q, $timeout, $auth, $rootScope, authToken,
      strapAlert, strapModal, commonsDataService ) {
      var vm = this;

      /* Literals */
      vm.token = authToken.getToken();
      /* Functions */
      vm.checkEmailInBlurred = checkEmailInBlurred;
      vm.register = register;
      vm.login    = login;


      function checkEmailInBlurred( signupForm ) {
        return $q.all( [checkEmailInBlurredCallBack()] )
          .then(function( response ) {
            console.log( response );
            if( response[0] !== undefined ) signupForm.email.$setValidity( 'taken', false );
            else signupForm.email.$setValidity( 'taken', true );

            return response;
          });
      }

      function checkEmailInBlurredCallBack() {
        return commonsDataService
          .checkEmail( 'isEmailTaken', {email: vm.email} )
          .then(function( response ) {
            return response;
          });
      }

      function register( registerFormIsValid ) {
        if( registerFormIsValid !== true ) return;

        $auth.signup({
          email: vm.email,
          password: vm.password,
          username: vm.username
        }).then(function( response ) {
          $rootScope.username = vm.username;
          strapModal.hide();
          strapAlert.show( 'Success!', 'Your account has been successfully created' );
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        }).catch(function( response ) {
          console.log( response );
        });
      }

      function login( isLoginFormValid ) {
        if( !isLoginFormValid ) return;

        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function( response ) {
          $rootScope.username = response.data.user.username;
          strapModal.hide();
        }).catch(function( error ) {
          strapAlert.show( 'Something, went wrong!', 'Wrong email/password', 'alert-logIn' );
          $timeout(function() {
            strapAlert.hide();
          }, 2000 );
        });
      }

      function loginCallBack() {
        return commonsDataService
          .login( 'userLogIn', {
            email: vm.email,
            password: vm.password
          })
          .then(function( response ) {
            return response;
          });
      }
    }
}());
