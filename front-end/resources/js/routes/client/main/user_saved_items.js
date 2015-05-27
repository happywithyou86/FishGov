(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('User_Saved_Items', User_Saved_Items);

    User_Saved_Items.$inject = ['$q', '$auth', 'commonsDataService', 'userServiceApi'];

    function User_Saved_Items($q, $auth, commonsDataService, userServiceApi) {
      var vm = this;

      vm.isAuthenticated  = $auth.isAuthenticated();
      vm.clicked_items    = clicked_items;

      function clicked_items(item_id) {
        if (!vm.isAuthenticated){
          return;
        }

        $q.all([save_click_items(item_id)])
          .then(function(response) {
            return response;
          });
      }

      function save_click_items(item_id) {
        return commonsDataService
          .httpPUTQueryParams(
            'clicked_items',
            {item_id:item_id},
            userServiceApi
          ).then(function(response) {
            return response;
          });
      }
    }
}());
