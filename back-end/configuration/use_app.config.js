(function() {
  'use strict';

  module.exports = function(app, io) {
    var clientRoutes    = io.rootPath + 'back-end/html_routes/client/',
        use_app_client  = {
          about       : require(clientRoutes + 'about'),
          item_search : require(clientRoutes + 'item_search'),
          main        : require(clientRoutes + 'main'),
          sample      : require(clientRoutes + 'sample'),
          search      : require(clientRoutes + 'search'),
        };

    return useApp([
      use_app_client.about,
      use_app_client.item_search,
      use_app_client.main,
      use_app_client.sample,
      use_app_client.search
    ]);

    function useApp(param) {
      param.forEach(function(name) {
        app.use('/', name);
      });
    }
  };
}());
