(function() {
  'use strict';

  angular
  .module('app.sample')
  .controller('Sample', Sample);

  Sample.$inject = ['logger'];

  function Sample( logger ) {
    var vm = this;

    logger.success( 'Sample View Activated' );

  }
})();
