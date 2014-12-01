
  "use strict";

  angular.module('app.restangular', [])
    .factory( 'serviceDatabaseApi', function ( Restangular ) {
      //return Restangular.all( 'mongo-api' )
      return Restangular.all( 'database-api' )
    })
    .factory('serviceAdminApi', function (Restangular) {
    	return Restangular.all("admin-api")
    })
    .factory('serviceParagalaStudentApi', function (Restangular) {
      return Restangular.all("paragala-student-api")
    })
    .factory('serviceParagalaQuestionsApi', function (Restangular) {
      return Restangular.all("paragala-student-api")
    })
    .factory( 'isserviceAdminApiLogin', function (Restangular)  {
      return Restangular.all( 'isserviceAdminApiLogin' )
    })
    .factory( 'isStudentLogin', function (Restangular) {
      return Restangular.all( 'isStudentLogin' )
    })
    .factory( 'RaveJudges', function (Restangular) {
      return Restangular.all( 'rave-api' )
    })
