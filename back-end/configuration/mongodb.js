(function() {
  'use strict';

  module.exports = function(node, dbName) {
    if (node.mongoose.connection.readyState !== 1) {
      var db = node.Promise.all([node.mongoose.connect(process.env.MONGODB || 'mongodb://localhost:27017/' + dbName)]);
      return db;
    } else {
      return node.Promise.all([node.mongoose]);
    }
  };

}());
