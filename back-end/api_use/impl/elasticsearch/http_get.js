(function() {
  'use strict';

  var elasticsearch = require('elasticsearch');

  exports.results = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    var client = new elasticsearch.Client({
      host: 'http://192.96.159.94:9200',
      //log: 'trace'
    });

    client.search({
      index: 'fishgov',
      type: 'data',
      body: {
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
          },
          // encoder: 'html'
        }
      }
    }).then(function (response) {
      var hits = response.hits.hits;
      console.log(response.hits.hits);
      console.log('jories');
      res.json({
        message: query.keyword + ' result set',
        status: 200,
        data: hits
      });
    }, function (err) {
       res.json(404, {
        message: 'Check Email',
        status: 404
      });
    });
  };
}());
