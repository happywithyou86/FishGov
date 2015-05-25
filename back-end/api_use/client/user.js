(function() {
  'use strict';

  var app       = io.express(),
      user_get  = require('../impl/user/http_get');

  app.route('/user/info')
    .get(io.authorize, io.xPoweredBy, user_get.info);

  app.route('/save_items')
    .get(io.xPoweredBy, io.authorize, user_get.saved_items);

  module.exports = app;
}());
