(function() {
  'use strict';

  angular
    .module( 'app.male' )
    .run( appRun );

    function appRun( routehelper ) {
      routehelper.configureRoutes( getRoutes() );
    }

    function getRoutes() {
      return [{
        state: 'addMale',
        config: {
          url: '/male/add',
          templateUrl : '/admin/male/add/index.html',
          controller: 'AddMale as vm',
          title: 'Add Candidate'
        }
      }];
    }
}());
