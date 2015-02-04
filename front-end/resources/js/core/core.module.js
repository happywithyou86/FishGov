(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate',
        'ui.router',
        'restangular',
        //'ngSanitize',
        /*
         * Commons module
        **/
        'app.commons',
        'app.strap',
        'app.services',
        'app.registerNsignIn',
        'app.layout',
        'app.widgets',
        /*
         * Our reusable cross app code modules
         */
        //'blocks.exception',
        'blocks.logger',
        'blocks.router',
        'blocks.exception',
        /*
         * 3rd Party modules
         */
        'mgcrea.ngStrap',
        'angular-loading-bar',
        'satellizer'
    ]);
})();
