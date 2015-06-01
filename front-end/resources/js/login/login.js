(function() {
  'use strict';

  angular
    .module('app.login')
    .controller('Login', Login);

    /*Inject angular related directive*/
    Login.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$window', '$auth', '$timeout', 'local_storage',
    'strapAlert', 'strapModal', 'commonsDataService', 'userServiceApi'];

    function Login($location, $q, $rootScope, $scope, $state, $window, $auth, $timeout, local_storage,
    strapAlert, strapModal, commonsDataService, userServiceApi) {
      var vm = this;
      vm.isAuthenticated = $auth.isAuthenticated();
      vm.authenticate    = authenticate;
      vm.logInUser       = logInUser;
      vm.log_out         = log_out;
      vm.login           = login;

      /*get the photo from local storage*/
      vm.photo        = local_storage.getToken('photo');

      function logInUser() {
        strapModal.show('am-fade-and-scale', 'center', 'commons/login.html');
      }

      function log_out() {
        $auth.logout();
        vm.photo = undefined;
        local_storage.removeToken('photo');
        local_storage.removeToken('saved_items');
        window.location.href = '/';
      }

      function login(isLoginFormValid) {
        if (!isLoginFormValid) {return;}

        $auth.login({
          email: vm.email,
          password: vm.password
        }).then(function(response) {
          $rootScope.username = response.data.user.username;
          strapModal.hide();
        }).catch(function(error) {
          strapAlert.show('Something, went wrong!', 'Wrong email/password', 'alert-logIn');
          $timeout(function() {
            strapAlert.hide();
          }, 2000);
        });
      }

      function loginCallBack() {
        return commonsDataService
          .login('userLogIn', {
            email: vm.email,
            password: vm.password
          })
          .then(function(response) {
            return response;
          });
      }

      function authenticate(provider) {
        $auth.authenticate(provider)
        .then(function(response) {
          var obj         = response.data;
          vm.photo        = obj.user.photo;
          vm.saved_items  = obj.saved_items;
          var saved_items_temp = [];
          for (var i = 0; i < vm.saved_items.length; i++) {
            saved_items_temp.push(vm.saved_items[i].item_id);
          }
          local_storage.setToken('photo', vm.photo);
          local_storage.setToken('saved_items', JSON.stringify(saved_items_temp));
          $rootScope.saved_count = saved_items_temp.length;
          window.location.href = window.location.href;
        }, function(err) {
          if (err) {throw err;}
        });
      }
    }
}());
