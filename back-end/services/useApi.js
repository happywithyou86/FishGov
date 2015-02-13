(function() {
  'use strict';


  module.exports = function(app) {
    return useApi([{
      name: '/userApi',
      url: global.io.useApiConfig().register
    }, {
      name: '/userApi',
      url: global.io.useApiConfig().login
    }]);

    function useApi(param) {
      for (var key in param) {
       if (param.hasOwnProperty(key)) {
          var obj = param[key];
          app.use(obj.name, obj.url);
        }
      }
    }
  };

}());
