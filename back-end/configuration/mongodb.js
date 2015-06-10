(function() {
  'use strict';

  module.exports = function (dbName) {
    if (io.mongoose.connection.readyState === 0) {
      console.log('0');
      return io.mongoose.connectAsync(process.env.MONGOLAB_URI || dbName);
    }
    // else {
    //   console.log('1');
    //   io.mongoose.disconnectAsync();
    //
    //   return io.mongoose.connectAsync(process.env.MONGOLAB_URI || dbName);
    // }
  };
}());
