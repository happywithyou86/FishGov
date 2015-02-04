(function() {
  'use strict';

  angular
    .module('app.commons')
    .factory('viewContentLoaded', viewContentLoaded);

    viewContentLoaded.$inject = ['$rootScope', 'logger'];

    function viewContentLoaded ($rootScope, logger) {
      /***
      ** Sample external jquery call
      ***/
      return {
        loadScript : function loadScript() {
          $rootScope.$on('$viewContentLoaded', function() {
            jcaLayout.fullPage();
          });
        },
        carouselScript : function carouselScript() {
          $rootScope.$on('$viewContentLoaded', function() {
            jcaLayout.carousel();
          });
        }
      };
    }
})();
