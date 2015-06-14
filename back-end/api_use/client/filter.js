(function() {
  'use strict';

  var app         = io.express(),
      filter_get  = require('../impl/filter/http_get');

  app.route('/search/filter/services')
    .post(filter_get.services_all);

  app.route('/search/filter/products')
    .post(filter_get.products_all);

  app.route('/search/filter_change')
    .post(filter_get.filter_change);

  app.route('/search/services/keyword')
    .post(filter_get.services_filter_keyword);

  app.route('/search/products/keyword')
    .post(filter_get.products_filter_keyword);

  module.exports = app;
}());
