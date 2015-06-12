(function() {
  'use strict';

  exports.services_filter_keyword = function(req, res, next) {
    /*spawn a process to get the services filter*/
    var services_data_filter;
    var cp = require('child_process').spawn;
    var spw = cp('node', [io.rootPath + 'back-end/runnable/user_filter_services.js', req.body.keyword]);
    spw.stdout.on('data', function (data) {
      services_data_filter = data;
      res.json({
        message : 'Retriving data from filter by keyword',
        status  : 200,
        data    : JSON.parse(services_data_filter)
      });
    });
  };

  exports.products_filter_keyword = function(req, res, next) {
    /*spawn a process to get the services filter*/
    var products_data_filter;
    var cp = require('child_process').spawn;
    var spw = cp('node', [io.rootPath + 'back-end/runnable/user_filter_products.js', req.body.keyword]);
    spw.stdout.on('data', function (data) {
      products_data_filter = data;
      res.json({
        message : 'Retriving data from filter by keyword',
        status  : 200,
        data    : JSON.parse(products_data_filter)
      });
    });
  };

  exports.services = function(req, res, next) {
    var options = {
      find    : {count: {$gt: 0}},
      message : 'Retrieving data from Filter Services',
      name    : 'Filter_Services',
      res     : res,
      sort    : {count: -1}
    };

      io.get.findList(options);
  };

  exports.products = function(req, res, next) {
    var options = {
      find    : {count: {$gt: 0}},
      message : 'Retrieving data from Filter Products',
      name    : 'Filter_Products',
      res     : res,
      sort    : {count: -1}
    };

    io.get.findList(options);
  };

  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
  });
  exports.filter_change = function(req, res, next) {
    var fromPage  = (req.body.fromPage - 1) * 20;
    var filter;
    if (req.body.filter.length !== 0 && (req.body.keyword === undefined)) {
      filter = {
        filtered : {
          filter  : {
            terms  : {
              classification_id : req.body.filter
            }
          }
        }
      };
    } else if(req.body.keyword === undefined) {
      filter = {
        match_all : {}
      };
    }

    if (req.body.keyword !== undefined && req.body.filter.length !== 0) {
      filter = {
        template: {
          query: {
            filtered: {
              filter  : {
                terms  : {
                  classification_id : req.body.filter
                }
              },
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
            keyword: req.body.keyword
          }
        }
      };
    } else if (req.body.keyword !== undefined){
      filter = {
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
            keyword: req.body.keyword
          }
        }
      };
    }

    client.search({
      index : 'fishgov',
      type  : 'data',
      body  : {
        from  : fromPage, size : 20,
        query : filter,
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
        message: 'Retrieving Filter Results',
        status: 200,
        data: {hits: hits.hits, total: hits.total}
      });
    });
  };
}());
