(function() {
  'use strict';

  angular
    .module('app.commons')
    .controller('Control', Control);

    function Control() {
      var vm = this;

      console.log( 'commonsControl' );
    }
})();
