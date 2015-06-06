(function() {
  'use strict';

  var app                 = io.express(),
      elastic_search      = require('../impl/elasticsearch/http_get'),
      elastic_search_put  = require('../impl/elasticsearch/http_put');

  app.route('/search/:id')
    .get(elastic_search_put.updateJson, elastic_search.item);

  app.route('/search')
    .get(elastic_search.results);

  app.route('/total')
    .get(elastic_search.total);

  module.exports = app;
}());
