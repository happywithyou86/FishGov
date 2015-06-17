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

  exports.services_all = function(req, res, next) {
    var services_all;
    var cp = require('child_process').spawn;
    var spw = cp('node',
      [io.rootPath + 'back-end/runnable/filter_services_all.js',
      req.body.option_val.is_award,
      req.body.option_val.is_sole_source]);
    spw.stdout.on('data', function (data) {
      services_all = data;
      res.json({
        message : 'Retriving Services Data from Option Filter',
        status  : 200,
        data    : JSON.parse(services_all)
      });
    });
  };

  exports.products_all = function(req, res, next) {
    var products_all;
    var cp = require('child_process').spawn;
    var spw = cp('node',
      [io.rootPath + 'back-end/runnable/filter_products_all.js',
      req.body.option_val.is_award,
      req.body.option_val.is_sole_source]);
    spw.stdout.on('data', function (data) {
      products_all = data;
      res.json({
        message : 'Retriving Products Data from Option Filter',
        status  : 200,
        data    : JSON.parse(products_all)
      });
    });
  };

  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
  });

  exports.filter_change = function(req, res, next) {
    var fromPage  = (req.body.fromPage - 1) * 20;
    var filter;
    console.log(req.body);

    /*all + option + filter + keyword=undefined*/
    if (req.body.asc !== undefined && req.body.option.length !== 0 &&
      req.body.filter.length !== 0 && req.body.keyword === undefined) {
        console.log('all + option + filter + keyword=undefined');
        console.log(req.body.filter);
        filter = {
          filtered: {
            filter: {
              bool : {
                must : {
                  terms : { classification_id : req.body.filter }
                },
                should : [
                  { term : {is_award : req.body.option_val.is_award}},
                  { term : {is_sole_source : req.body.option_val.is_sole_source}}
                ]
              }
            }
          }
        };/*all + option + no-filter + keyword=undefined*/
    } else if (req.body.asc !== undefined && req.body.option.length !== 0 &&
        req.body.filter.length === 0 && req.body.keyword === undefined) {
          console.log('all + option + no-filter + keyword=undefined');
          filter = {
            filtered: {
              filter: {
                bool : {
                  should : [
                    { term : {is_award : req.body.option_val.is_award}},
                    { term : {is_sole_source : req.body.option_val.is_sole_source}}
                  ]
                }
              }
            }
          };
      } else if (req.body.asc !== undefined && req.body.option.length !== 0 &&
        req.body.filter.length === 0 && req.body.keyword === undefined) {
          console.log('option +');
          filter = {
            filtered: {
              filter: {
                bool : {
                  should : [
                    { term : {is_award : req.body.option_val.is_award}},
                    { term : {is_sole_source : req.body.option_val.is_sole_source}}
                  ]
                }
              }
            }
          };/*default asc = true , p=1*/
    } else if (req.body.asc !== undefined && req.body.option.length === 0 &&
      req.body.filter.length === 0 && req.body.keyword === undefined) {
        console.log('default asc = true , p=1');
        filter = {
          filtered: {
            filter: {
              bool : {
                should : [
                  { term : {is_award : false}},
                  { term : {is_sole_source : false}}
                ]
              }
            }
          }
        };/*all + filter*/
    } else if (req.body.asc !== undefined && req.body.option.length === 0 &&
      req.body.filter.length !== 0 && req.body.keyword === undefined) {
        console.log('all + filter');
        filter = {
          filtered : {
            filter  : {
              terms  : {
                classification_id : req.body.filter
              }
            }
          }
        };/*all + no-filter + default data*/
    } else if (req.body.asc !== undefined && req.body.filter.length === 0 && req.body.keyword === undefined) {
      console.log('all + no-filter + default data');
      filter = {
        filtered: {
          filter: {
            bool : {
              should : [
                { term : {is_award : false}},
                { term : {is_sole_source : false}}
              ]
            }
          }
        }
      };/*keyword + filter*/
    } else if (req.body.keyword !== undefined && req.body.filter.length !== 0 && req.body.asc === undefined) {
      console.log('keyword + filter');
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
      };/*keyword + no-filter*/
    } else if (req.body.keyword !== undefined && req.body.filter.length === 0 && req.body.asc === undefined) {
      console.log('keyword + no-filter');
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
