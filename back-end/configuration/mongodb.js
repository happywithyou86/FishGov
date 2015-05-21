(function() {
  'use strict';

  module.exports = function (dbName) {
    if(io.mongoose.connection.readyState === 0 ) {
      return io.mongoose.connectAsync(dbName);
    } else {
      return io.mongoose.disconnectAsync();
    }
  };
}());
