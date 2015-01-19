(function() {
  'use strict';

  module.exports = function ( node_module, dbName ) {
    if( node_module.mongoose.connection.readyState !== 1 ) {
      var db  = node_module.Promise.all([node_module.mongoose.connect( process.env.MONGODB || 'mongodb://localhost:27017/' + dbName )]);
      return db;
    } else {
      return node_module.Promise.all([node_module.mongoose]);
    }
  };

}());
