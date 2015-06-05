(function() {
    'use strict';

    var config = {
      appErrorPrefix: '[Magens Error] ', //Configure the exceptionHandler decorator
      appTitle: 'FISH GOV DEVELOPMENT MODE',
      version: '0.0.0'
    };

    angular
      .module('app.core')
      .value('config', config)
      .config(configure)
      .config(toastrConfig)
      .config(registerNsignInConfig)
      .run(get_browser_info);

    toastrConfig.$inject = ['toastr'];
    /* @ngInject */
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    get_browser_info.$inject = ['$rootScope', 'browser'];
    /*@ngInject*/
    function get_browser_info($rootScope, browser) {
      var ua = navigator.userAgent,
          tem,
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

      if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE ',version:(tem[1]||'')};
      }
      if (M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/);
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
      }
      M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}

      if (M[0] === 'Chrome') {
        $rootScope.validateBrowser = true;
        if ((parseInt(M[1]) - 5) < 38) {
          browser.warning('Please update the version of your browser');
        }
      } else if (M[0] === 'Firefox') {
        if ((parseInt(M[1]) - 5) < 33) {
          browser.warning('Please update the version of your browser');
        }
      } else if (M[0] === 'Safari') {
        if ((parseInt(M[1]) - 1) < 5) {
          browser.warning('Please update the version of your browser');
        }
      } else if (M[0] === 'IE') {
          if ((parseInt(M[1]) - 1) < 11) {
            browser.warning('Please update the version of your browser');
        }
      } else if (M[0] === 'Opera') {
          if ((parseInt(M[1]) - 1) < 11) {
            browser.warning('Please update the version of your browser');
        }
      }
    }

    registerNsignInConfig.$inject = ['$authProvider', 'cfpLoadingBarProvider', '$rootScopeProvider'];
    /* @ngInject */
    function registerNsignInConfig($authProvider, cfpLoadingBarProvider, $rootScopeProvider) {
      cfpLoadingBarProvider.latencyThreshold = 400;
      $authProvider.loginRedirect = $rootScopeProvider.pathname;
      $authProvider.loginUrl      = window.location.origin + '/userApi/userLogIn';
      $authProvider.signupUrl     = window.location.origin + '/userApi/userRegister';
      $authProvider.tokenPrefix   = 'fishgov';

      $authProvider.facebook({
        clientId: '789445017793242',
        url: window.location.origin + '/userApi/logInUserFacebook'
      });

      $authProvider.google({
        clientId: '514855305579-vmrkir3l76c0v2t6b5mtnphh38uf9irp.apps.googleusercontent.com',
        url: window.location.origin + '/userApi/logInUserGoogle'
      });

      $authProvider.linkedin({
        clientId: '75uwishg7c5x02',
        url: window.location.origin + '/userApi/login/linkedin',
      });
    }

    configure.$inject = ['$httpProvider', '$locationProvider', '$logProvider', '$urlRouterProvider',
      '$stateProvider', 'exceptionHandlerProvider', 'routehelperConfigProvider'];
    /* @ngInject */
    function configure ($httpProvider, $locationProvider, $logProvider, $urlRouterProvider,
      $stateProvider, exceptionHandlerProvider, routehelperConfigProvider) {

        $locationProvider.html5Mode(true);
        if ($logProvider.debugEnabled) {
          $logProvider.debugEnabled(true);
        }

        routehelperConfigProvider.config.$stateProvider = $stateProvider;
        routehelperConfigProvider.config.$urlRouterProvider = $urlRouterProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';

        $httpProvider.interceptors.push('authInterceptor');
        /*Configure the common exception handler*/
        exceptionHandlerProvider.configure(config.appErrorPrefix);
    }
})();
