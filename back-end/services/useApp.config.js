(function() {
  'use strict';

  module.exports = function() {
    var clientRoutes = global.io.rootPath + 'back-end/routes/client/';
    var useApp = {
      main     : require(clientRoutes + 'main'),
      sample   : require(clientRoutes + 'sample'),
    };
    return useApp;
  };
}());
