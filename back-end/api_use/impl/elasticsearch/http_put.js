(function() {
  'use strict';

  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
  });

  exports.updateJson = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;

    /*test if we have keyword present*/
    /*keyword = undefiend means the user click the all results*/
    if (query.keyword === undefined || query.keyword === '') {
      return next();
    }
    client.update({
      index: 'fishgov',
      type: 'data',
      id : req.params.id,
      body: {
        script: 'if (ctx._source.search_keywords == null) { ctx._source.search_keywords = default_value }' +
          'else {ctx._source.search_keywords += search_keywords }',
        params: {
          search_keywords: ',' + query.keyword,
          default_value: query.keyword
        }
      }
    });
    next();
  };
}());
