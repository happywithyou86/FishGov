(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Item_Search', Item_Search);

    Item_Search.$inject = ['$auth'];

    function Item_Search($auth) {
      var vm = this;
      
      vm.isAuthenticated  = $auth.isAuthenticated();

    }
}());
