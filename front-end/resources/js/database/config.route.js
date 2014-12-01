(function() {
    'use strict';

    angular
        .module('app.database')
        .run(appRun);

    //appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'database',
                config: {
                    url: '/database',
                    templateUrl: '/database/index.html',
                    controller: 'Database as vm',
                    title: 'database',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Database'
                    }
                }
            }, {
                state: 'database_database',
                config: {
                    url: '/database/:database',
                    templateUrl: '/database/index.html',
                    controller: 'Database as vm',
                    title: 'database'
                }
            }, {
                state: 'database_database_collection',
                config: {
                    url: '/database/:database/:collection',
                    templateUrl: '/database/index.html',
                    controller: 'Database as vm',
                    title: 'database'
                }
            }, {
              state: 'database_database_collection_id',
              config: {
                url: '/database/:database/:collection/:id',
                templateUrl: '/database/index.html',
                controller: 'Database as vm',
                title: 'database'
              }
            }
        ];
    }
})();
