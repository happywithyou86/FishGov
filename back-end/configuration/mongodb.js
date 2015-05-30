(function() {
  'use strict';

  module.exports = function (dbName) {
    if (io.mongoose.connection.readyState === 0) {
      return io.mongoose.connectAsync(process.env.MONGOLAB_URI || dbName);
    } else {
      io.mongoose.disconnectAsync();
      return io.mongoose.connectAsync(process.env.MONGOLAB_URI || dbName);
    }
  };
}());
