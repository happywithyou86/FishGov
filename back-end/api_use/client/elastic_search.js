(function() {
  'use strict';

  var app             = io.express(),
      elastic_search  = require('../impl/elasticsearch/http_get');

  app.route('/search/:id')
    .get(elastic_search.item);

  app.route('/search')
    .get(elastic_search.results);

  app.route('/total')
    .get(elastic_search.total);

  module.exports = app;
}());
