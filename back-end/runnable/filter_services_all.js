(function() {
  'use strict';

  var is_award        = process.argv[2],
      is_sole_source  = process.argv[3];

  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
  });

  var services = [{
        code: 'A',
        name: 'Research & Development'
      }, {
        code: 'B',
        name: 'Special studies and analysis'
      }, {
        code: 'C',
        name: 'Architect and engineering services'
      }, {
        code: 'D',
        name: 'Information technology services, including telecommunications services'
      }, {
        code: 'E',
        name: 'Purchase of structures & facilities'
      }, {
        code: 'F',
        name: 'Natural resources & conservation services'
      }, {
        code: 'G',
        name: 'Social services'
      }, {
        code: 'H',
        name: 'Quality control, testing & inspection services'
      }, {
        code: 'J',
        name: 'Maintenance, repair & rebuilding of equipment'
      }, {
        code: 'K',
        name: 'Modification of equipment'
      }, {
        code: 'L',
        name: 'Technical representative services'
      }, {
        code: 'M',
        name: 'Operation of Government-owned facilities'
      }, {
        code: 'N',
        name: 'Installation of equipment'
      }, {
        code: 'P',
        name: 'Salvage services'
      }, {
        code: 'Q',
        name: 'Medical services'
      }, {
        code: 'R',
        name: 'Professional, administrative, and management support services'
      }, {
        code: 'S',
        name: 'Utilities and housekeeping services'
      }, {
        code: 'T',
        name: 'Photographic, mapping, printing, & publication services'
      }, {
        code: 'U',
        name: 'Education & training services'
      }, {
        code: 'V',
        name: 'Transportation, travel, & relocation services'
      }, {
        code: 'W',
        name: 'Lease or Rental of equipment'
      }, {
        code: 'X',
        name: 'Lease or rental of facilities'
      }, {
        code: 'Y',
        name: 'Construction of structures and facilities'
      },  {
        code: 'Z',
        name: 'Maintenance, repair, and alteration of real property'
      }];


  var total = 0;
  var result = [];
  for (var i = 0; i < services.length; i++) {
    (function(i, services) {
      getCount(services[i], services, i);
    })(i, services);
  }

  function compare(a,b) {
    if (a.count < b.count) {
      return 1;
    }
    if (a.count > b.count) {
      return -1;
    }
    return 0;
  }

  function getCount(item, service, length) {
    client.count({
      index: 'fishgov',
      type: 'data',
      body: {
        query: {
          filtered: {
            filter: {
              bool : {
                must : {
                  term : { classification_id : item.code }
                },
                should : [
                  { term : {is_award : is_award}},
                  { term : {is_sole_source : is_sole_source}}
                ]
              }
            }
          }
        }
      }
    }).then(function(response) {
      if (response.count !== 0) {
        result.push({
          classification_code: item.code,
          classification_text: item.name,
          count: parseInt(response.count)
        });
        if ((service.length - 1) === length) {
          result.sort(compare);
          console.log(JSON.stringify(result));
        }
      } else {
        if ((service.length - 1) === length) {
          result.sort(compare);
          console.log(JSON.stringify(result));
        }
      }
    });
  }
}());
