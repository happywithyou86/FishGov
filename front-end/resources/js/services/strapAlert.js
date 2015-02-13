(function() {
  'use strict';

  angular
  .module('app.services')
  .service('strapAlert', strapAlert);

  strapAlert.$inject = ['$alert'];
  /* @ngInject */
  function strapAlert($alert) {
    var vm = this;

    /* Literals */
    vm.alerObj = null;
    /* Functions */
    vm.alert = alert;
    vm.show  = show;
    vm.hide  = hide;

    function show(title, content, container, type) {
      vm.alerObj = vm.alert(title, content, container, type);
    }

    function hide() {
      vm.alerObj.hide();
    }

    function alert(title, content, container, type) {
      var strapAlert = $alert({
        title: title,
        content: content,
        type: type || 'info',
        container: container || 'alert-info',
        show: true
      });

      return strapAlert;
    }
  }
}());
