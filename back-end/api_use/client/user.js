(function() {
  'use strict';

  var app       = io.express(),
      user_get  = require('../impl/user/http_get');

  app.route('/user/info')
    .get(io.authorize, io.xPoweredBy, user_get.info);

  module.exports = app;
}());
