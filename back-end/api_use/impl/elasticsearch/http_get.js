(function() {
  'use strict';

  var elasticsearch = require('elasticsearch');

  exports.results = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    var page = query.p;
    var fromPage = (page - 1) * 20;
    console.log(query);
    var client = new elasticsearch.Client({
      host: '127.0.0.1:9200',
      //log: 'trace'
    });

    client.search({
      index: 'fishgov',
      type: 'data',
      body: {
        from : fromPage, size : 20,
        query: {
          template: {
            query: {
              filtered: {
                query: {
                  multi_match: {
                    query: '{{keyword}}',
                    fields: ['title', 'description']
                  }
                }
              }
            },
            params: {
              keyword: query.keyword
            }
          }
        },
        highlight : {
          tags_schema : 'styled',
          fields : {
            description : {
              fragment_size: 250,
              number_of_fragments: 1,
              no_match_size: 150
            }
          }
        }
      }
    }).then(function (response) {
      var hits = response.hits;
      res.json({
        message: query.keyword + ' result set',
        status: 200,
        data: {hits: hits.hits, total: hits.total}
      });
    }, function (err) {
       res.json(404, {
        message: 'Check Email',
        status: 404
      });
    });
  };
}());
