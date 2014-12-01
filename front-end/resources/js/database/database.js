(function() {
    'use strict';

    angular
        .module('app.database')
        .controller('Database', Database);

    Database.$inject = ['$q', '$rootScope', '$stateParams', '$location', 'databaseDataservice',
      'serviceDatabaseApi', 'logger', 'commonsDataservice', 'Restangular'];

    function Database($q, $rootScope, $stateParams, $location, databaseDataservice,
      serviceDatabaseApi, logger, commonsDataservice, Restangular ) {

        /*jshint validthis: true */
        var vm = this;

        vm.database     = [];
        vm.route        = null;
        vm.adminLogin   = null;
        vm.showAce      = null;
        vm.addDb        = addDb;
        vm.removeDb     = removeDb;
        vm.aceLoaded    = aceLoaded;
        vm.saveDocument = saveDocument;

        init();

        function init() {
            runningUrl();
            loadDatabase();
            getserviceAdminApiLoginData();
        }

        function loadDatabase() {
            var promise = [getDatabaseData(), getserviceAdminApiLoginData()];
            return $q.all(promise).then(function() {
                logger.success('Activated Database View');
            });
        }

        function getDatabaseData() {
            return databaseDataservice.getserviceAdminApiDatabase( vm.route ).then(function( response ) {
              if ($stateParams['id'] ) {
                vm.database = JSON.stringify( Restangular.stripRestangular( response ), null, 2 )
                vm.showAce = true;
              } else {
                vm.database = response
                vm.showAce = false
              }
              return vm.database
            });
        }

        function getserviceAdminApiLoginData() {
          return commonsDataservice.getserviceAdminApiLoginStatus( 'admin', {} ).then( function ( data ) {
            vm.adminLogin = data.isserviceAdminApiLogin
            return vm.adminLogin;
          })
        }

        function addDb( dbName ) {
            var dbexisted = true
            vm.database.forEach(function ( db ) {
              if(dbName == db.name) dbexisted = false;
            })

            if( dbName && dbexisted ) {
                var newDb = ({name : dbName});
                serviceDatabaseApi.all( vm.route ).post( newDb )
                _.extend($rootScope, $stateParams);
                vm.database.push({name : dbName, url : $location.path().slice(1) + '/' + dbName })
            }
        }

        function removeDb( db ) {
            if(confirm( 'Delete' )) {
                serviceDatabaseApi.all( vm.route ).remove({name : db.name})
                vm.database.splice(vm.database.indexOf( db ), 1)
            }
        }

        function aceLoaded( _editor ) {
          //ace editor
          var _session = _editor.getSession();
          var _renderer = _editor.renderer;

          _editor.setReadOnly(false);
          _session.setUndoManager(new ace.UndoManager());

          _editor.on("change", function(){
          vm.database = _editor.getValue();
          });
        }

        function saveDocument( doc ) {
          var parse = JSON.parse(doc)
          serviceDatabaseApi.all( vm.route ).post({documentId:parse})
        }

        function runningUrl() {
            console.log( $stateParams )
            _.extend($rootScope, $stateParams );
            var context = "admin";
            var route = null;

            if($stateParams.database) context = "";

            $rootScope.runningUrl = [];

            for(var param in $stateParams){
              $rootScope.runningUrl.push($stateParams[param])
            }

            switch (context) {
                case "admin":
                    route = "dbs";
                    break;
                default:
                    route =  $rootScope.runningUrl.join('/');
                    route  = 'db/' + route
            }

            return vm.route = route;
        }
    }
})();
