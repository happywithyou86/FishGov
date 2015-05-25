(function() {
  'use strict';

  var app       = io.express(),
      user_get  = require('../impl/user/http_get'),
      user_post = require('../impl/user/http_post'),
      user_put = require('../impl/user/http_put');

  app.route('/user/info')
    .get(io.authorize, io.xPoweredBy, user_get.info);

  app.route('/saved_items')
    .post(io.xPoweredBy, io.authorize, user_post.saved_items);

  app.route('/clicked_items')
    .put(io.xPoweredBy, io.authorize, user_put.clicked_items);

  app.route('/search_terms')
    .put(io.xPoweredBy, io.authorize, user_put.search_terms);

  module.exports = app;
}());
