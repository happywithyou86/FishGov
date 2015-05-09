(function() {
  'use strict';

  var app             = io.express(),
      elastic_search  = require('../impl/elasticsearch/http_get');

  app.route('/search')
    .get(elastic_search.results);

  module.exports = app;
}());
