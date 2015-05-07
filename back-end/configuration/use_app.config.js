(function() {
  'use strict';

  module.exports = function(app, io) {
    var clientRoutes    = io.rootPath + 'back-end/html_routes/client/',
        use_app_client  = {
          about     : require(clientRoutes + 'about'),
          main      : require(clientRoutes + 'main'),
          sample    : require(clientRoutes + 'sample'),
        };

    return useApp([
      use_app_client.about,
      use_app_client.main,
      use_app_client.sample
    ]);

    function useApp(param) {
      param.forEach(function(name) {
        app.use('/', name);
      });
    }
  };
}());
