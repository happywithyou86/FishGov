
  "use strict";

  var mongo  = require('mongodb').Db;
  var server = require('mongodb').Server
  var Promise = require('bluebird');
  var bodyParser = Promise.promisify(require('body-parser').json());


  exports.db = function ( dbName ) {
    var db  = require( 'promised-mongo' )( process.env.MONGODB || 'mongodb://localhost:27017/' + dbName );
    return db;
  }
