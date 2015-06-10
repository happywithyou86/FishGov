(function() {
  'use strict';

  var db      = require('promised-mongo')('govfish'),
      Promise = require('bluebird');

  var promises = [];

  var elasticsearch = require('elasticsearch');
  var client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
  });

  var products = [{
      code: '10',
      name: 'Weapons'
    }, {
      code: '11',
      name: 'Nuclear ordnance',
    }, {
      code: '12',
      name: 'Fire control equipment'
    }, {
      code: '13',
      name: 'Ammunition & explosives'
    }, {
      code: '14',
      name: 'Guided missiles'
    }, {
      code: '15',
      name: 'Aircraft & airframe structural components'
    }, {
      code: '16',
      name: 'Aircraft components & accessories'
    }, {
      code: '17',
      name: 'Aircraft launching, landing & ground handling equipment'
    }, {
      code: '18',
      name: 'Space vehicles'
    }, {
      code: '19',
      name: 'Ships, small craft, pontoons & floating docks'
    }, {
      code: '20',
      name: 'Ship and marine equipment'
    }, {
      code: '22',
      name: 'Railway equipment'
    }, {
      code: '23',
      name: 'Ground effects vehicles, motor vehicles, trailers & cycles'
    }, {
      code: '24',
      name: 'Tractors'
    }, {
      code: '25',
      name: 'Vehicular equipment components'
    }, {
      code: '26',
      name: 'Tires and tubes'
    }, {
      code: '28',
      name: 'Engines, turbines & components'
    }, {
      code: '29',
      name: 'Engine accessories'
    }, {
      code: '30',
      name: 'Mechanical power transmission equipment'
    }, {
      code: '31',
      name: 'Bearings'
    }, {
      code: '32',
      name: 'Woodworking machinery and equipment'
    }, {
      code: '34',
      name: 'Metalworking machinery'
    }, {
      code: '35',
      name: 'Service and trade equipment'
    }, {
      code: '36',
      name: 'Special industry machinery'
    }, {
      code: '37',
      name: 'Agricultural machinery & equipment'
    }, {
      code: '38',
      name: 'Construction, mining, excavating & highway maintenance equipment'
    }, {
      code: '39',
      name: 'Materials handling equipment'
    }, {
      code: '40',
      name: 'Rope, cable, chain & fittings'
    }, {
      code: '41',
      name: 'Refrigeration, air-conditioning & air circulating equipment'
    }, {
      code: '42',
      name: 'Fire fighting, rescue & safety equipment'
    }, {
      code: '43',
      name: 'Pumps & compressors'
    }, {
      code: '44',
      name: 'Furnace, steam plant & drying equipment; & nuclear reactors'
    }, {
      code: '45',
      name: 'Plumbing, heating, & sanitation equipment'
    }, {
      code: '46',
      name: 'Water purification & sewage treatment equipment'
    }, {
      code: '47',
      name: 'Pipe, tubing, hose & fittings'
    }, {
      code: '48',
      name: 'Valves'
    }, {
      code: '49',
      name: 'Maintenance & repair shop equipment'
    }, {
      code: '51',
      name: 'Hand tools'
    }, {
      code: '52',
      name: 'Measuring tools'
    }, {
      code: '53',
      name: 'Hardware & abrasives'
    }, {
      code: '54',
      name: 'Prefabricated structures and scaffolding'
    }, {
      code: '55',
      name: 'Lumber, millwork, plywood & veneer'
    }, {
      code: '56',
      name: 'Construction & building materials'
    }, {
      code: '58',
      name: 'Communication, detection, & coherent radiation equipment'
    }, {
      code: '59',
      name: 'Electrical and electronic equipment components'
    }, {
      code: '60',
      name: 'Fiber optics materials, components, assemblies & accessories'
    }, {
      code: '61',
      name: 'Electric wire & power & distribution equipment'
    }, {
      code: '62',
      name: 'Lighting fixtures & lamps'
    }, {
      code: '63',
      name: 'Alarm, signal & security detection equipment'
    }, {
      code: '65',
      name: 'Medical, dental & veterinary equipment & supplies'
    }, {
      code: '66',
      name: 'Instruments & laboratory equipment'
    }, {
      code: '67',
      name: 'Photographic equipment'
    }, {
      code: '68',
      name: 'Chemicals & chemical products'
    }, {
      code: '69',
      name: 'Training aids & devices'
    }, {
      code: '70',
      name: 'General purpose information technology equipment'
    }, {
      code: '71',
      name: 'Furniture'
    }, {
      code: '72',
      name: 'Household & commercial furnishings & appliances'
    }, {
      code: '73',
      name: 'Food preparation and serving equipment'
    }, {
      code: '74',
      name: 'Office machines, text processing systems & visible record equipment'
    }, {
      code: '75',
      name: 'Office supplies and devices'
    }, {
      code: '76',
      name: 'Books, maps & other publications'
    }, {
      code: '77',
      name: 'Musical instruments, phonographs & home-type radios'
    }, {
      code: '78',
      name: 'Recreational & athletic equipment'
    }, {
      code: '79',
      name: 'Cleaning equipment and supplies'
    }, {
      code: '80',
      name: 'Brushes, paints, sealers & adhesives'
    }, {
      code: '81',
      name: 'Containers, packaging, & packing supplies'
    }, {
      code: '83',
      name: 'Textiles, leather, furs, apparel & shoe findings, tents & flags'
    }, {
      code: '84',
      name: 'Clothing, individual equipment & insignia'
    }, {
      code: '85',
      name: 'Toiletries'
    }, {
      code: '87',
      name: 'Agricultural supplies'
    }, {
      code: '88',
      name: 'Live animals'
    }, {
      code: '89',
      name: 'Subsistence'
    }, {
      code: '91',
      name: 'Fuels, lubricants, oils & waxes'
    }, {
      code: '93',
      name: 'Nonmetallic fabricated materials'
    }, {
      code: '94',
      name: 'Nonmetallic crude materials'
    }, {
      code: '95',
      name: 'Metal bars, sheets & shapes'
    }, {
      code: '96',
      name: 'Ores, minerals & their primary products'
    }, {
      code: '99',
      name: 'Miscellaneous'
    }];

  var total = 0;
  for (var j = 0; j < products.length; j++) {
    (function(j) {
      getCount(products[j], j);
    })(j);
  }

  function getCount(item, length) {
    client.count({
      index: 'fishgov',
      type: 'data',
      body: {
        query : {
          match: {
            classification_id: item.code
          }
        }
      }
    }).then(function(response) {
      promises.push(
        db.collection('filter_products').insert({
          _id: item.code,
          classification_code: item.code,
          classification_text: item.name,
          count: response.count
        })
      );

      if ((products.length - 1) === length) {
        Promise.all(promises).then(function () {
          process.exit();
        });
      }
    });
  }
}());
