(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('local_storage', local_storage);

    local_storage.$inject = ['$window'];

  /* @ngInject */
  function local_storage($window) {
    var storage = $window.localStorage;
    var cachedToken;

    var localToken = {
      setToken: function(name, value) {
        cachedToken = value;
        storage.setItem(name, value);
      },
      getToken: function(name) {
        if (!cachedToken) {
          cachedToken = storage.getItem(name);
          if (cachedToken === null) {
            cachedToken = undefined;
          }
        }

        return cachedToken;
      },
      removeToken: function(name) {
        cachedToken = null;
        storage.removeItem(name);
      }
    };

    return localToken;
  }
}());
