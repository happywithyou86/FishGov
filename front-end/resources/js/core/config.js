(function() {
    'use strict';

    var core = angular.module('app.core');

    //core.config(toastrConfig);

    /* @ngInject */
    // function toastrConfig(toastr) {
    //     toastr.options.timeOut = 4000;
    //     toastr.options.positionClass = 'toast-bottom-left';
    // }

    var config = {
        appErrorPrefix: '[Magens Error] ', //Configure the exceptionHandler decorator
        appTitle: 'Magens Boilerplate',
        version: '0.0.0'
    };

    core.value('config', config);
    core.config(configure);

    /* @ngInject */
    function configure ( $locationProvider, $logProvider, $urlRouterProvider, $stateProvider,
      routehelperConfigProvider, exceptionHandlerProvider) {
        //exceptionConfigProvider
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

        // Configure the common route provider
        //routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

        $locationProvider
          .html5Mode(true);

        // Configure the common exception handler
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
