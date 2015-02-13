(function() {
  'use strict';

  module.exports = function(app) {
    return useApp([
      global.io.useAppConfig().main,
      global.io.useAppConfig().sample
    ]);

    function useApp(param) {
      param.forEach(function(name) {
        app.use('/', name);
      });
    }
  };

}());
