(function() {
    'use strict';

    angular
        .module('app.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$timeout', 'config', 'logger'];

    function Shell($timeout, config, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = config.appTitle;
        vm.showSplash = true;

        activate();
        function activate() {
            logger.success(vm.title);
            hideSplash();
        }

        function hideSplash() {
            /*Force a 1 second delay so we can see the splash*/
            $timeout(function() {
                vm.showSplash = false;
            }, 1000);
        }
    }
})();
