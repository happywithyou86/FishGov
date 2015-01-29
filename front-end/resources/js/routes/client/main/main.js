(function() {
  'use strict';

  angular
    .module( 'app.main' )
    .controller( 'Main', Main );

    Main.$inject = [ '$rootScope' ];

    function Main( $rootScope ) {
      var vm = this;

    }
}());
