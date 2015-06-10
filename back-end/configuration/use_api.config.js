(function() {
  'use strict';

  module.exports = function(app, io) {
    var routes_api_client = io.rootPath + 'back-end/api_use/client/';

    var use_api_client = {
        elastic_search: require(routes_api_client + 'elastic_search'),
        filter        : require(routes_api_client + 'filter'),
        login         : require(routes_api_client + 'login'),
        register      : require(routes_api_client + 'register'),
        user          : require(routes_api_client + 'user')
    };
    return useApi([{
      name: '/filterApi',
      url: use_api_client.filter
    }, {
      name: '/userApi',
      url: use_api_client.register
    }, {
      name: '/userApi',
      url: use_api_client.login
    }, {
      name: '/userApi',
      url: use_api_client.user
    }, {
      name: '/elasticsearchApi',
      url: use_api_client.elastic_search
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
