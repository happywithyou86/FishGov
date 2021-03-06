(function() {
  'use strict';

  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
  });

  exports.results = function(req, res, next) {
    var query     = io.url.parse(req.url, true).query;
    var page      = query.p;
    var fromPage  = (page - 1) * 20;
    console.log(query);
    if (query.asc === 'true') {
      console.log('true');
      client.search({
        index : 'fishgov',
        type  : 'data',
        body  : {
          from  : fromPage, size : 20,
          query: {

          },
          sort  : {
            posted_date_var: {
              order : 'desc'
            }
          },
          highlight : {
            tags_schema : 'styled',
            fields      : {
              description : {
                fragment_size       : 250,
                number_of_fragments : 1,
                no_match_size       : 150
              }
            }
          }
        }
      }).then(function(response) {
        var hits = response.hits;
        res.json({
          message: query.keyword + ' result set',
          status: 200,
          data: {hits: hits.hits, total: hits.total}
        });
      });
      return;
    }

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
                    fields: ['title', 'description'],
                    fuzziness: 'AUTO',
                    prefix_length: 5
                    // minimum_should_match: '80%'
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

  exports.item = function(req, res, next) {
    var query = io.url.parse(req.url, true).query;
    var filtered;
    if(query.keyword === undefined || query.keyword === '') {
      filtered = {
        /* first step we must know if the socket id is present*/
        filter: { term: { _id: req.params.id }}
      };
    } else {
      filtered = {
        filter: { term: { _id: req.params.id }},
        query: {
          multi_match: {
            query: query.keyword,
            fields: ['title', 'description'],
            minimum_should_match: '80%'
          }
        }
      };
    }
    client.search({
      index: 'fishgov',
      type: 'data',
      body: {
        query: {
          filtered: filtered
        },
        highlight : {
          tags_schema : 'styled',
          fields : {
            description : {
              number_of_fragments : 0
            }
          }
        }
      }
    }).then(function(body) {
      var hits = body.hits.hits;

      /*get a strip a data in the highlighted text*/
      client.search({
        index: 'fishgov',
        type: 'data',
        body: {
          query: {
            filtered: filtered
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
      }).then(function(body) {
        var description = hits[0]._source.description;
        if (body.hits.hits[0] !== undefined) {
          description = body.hits.hits[0].highlight.description[0];
        }

        res.json({
          message: 'Item Result',
          status: 200,
          data: {hits: hits, description: description}
        });
      });
      /*end of getting the highlighted text*/
    });
  };

  exports.total = function(req, res, next) {
    client.search({
      index: 'fishgov',
      type: 'data'
    }).then(function(body) {
      var total = body.hits.total;
      res.json({
        message: 'Item Result',
        status: 200,
        data: {total: total}
      });
    });
  };
}());
