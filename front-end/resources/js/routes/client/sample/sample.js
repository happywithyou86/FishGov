(function() {
  'use strict';

  angular
  .module('app.sample')
  .controller('Sample', Sample);

  Sample.$inject = ['logger', 'viewContentLoaded'];

  function Sample(logger, viewContentLoaded) {
    var vm = this;

    logger.success('Sample View Activated');

  }
})();
