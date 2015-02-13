(function() {
  'use strict';

  angular
    .module('app.register')
    .controller('Register', Register);

    Register.$inject = ['$q', '$rootScope', '$timeout', '$auth', 'strapAlert','strapModal', 'commonsDataService'];

    function Register($q, $rootScope, $timeout, $auth, strapAlert, strapModal, commonsDataService) {
      var vm = this;
      vm.isAuthenticated = $auth.isAuthenticated;
      vm.checkEmailInBlurred = checkEmailInBlurred;

      vm.authenticate    = authenticate;
      vm.registerUser    = registerUser;
      vm.register        = register;

      function registerUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/register.html');
      }

      function authenticate(provider) {
        $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.username = response.data.user.displayName || response.data.user.username;
          vm.isAuthenticated = $auth.isAuthenticated;
        }, function(err) {
          if (err) {throw err;}
        });
      }

      function checkEmailInBlurred(signupForm) {
        return $q.all([checkEmailInBlurredCallBack()])
          .then(function(response) {
            if (response[0] !== undefined) {signupForm.email.$setValidity('taken', false);}
            else {signupForm.email.$setValidity('taken', true);}

            return response;
          });
      }

      function checkEmailInBlurredCallBack() {
        return commonsDataService
          .checkEmail('isEmailTaken', {email: vm.email})
          .then(function(response) {
            return response;
          });
      }

      function register(registerFormIsValid) {
        console.log('jories');
        if (registerFormIsValid !== true) {return;}

        $auth.signup({
          email: vm.email,
          password: vm.password,
          username: vm.username
        }).then(function(response) {
          $rootScope.username = vm.username;
          strapModal.hide();
          strapAlert.show('Success!', 'Your account has been successfully created');
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        }).catch(function(response) {
          console.log(response);
        });
      }


    }
}());
