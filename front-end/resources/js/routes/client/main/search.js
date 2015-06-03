(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Search', Search);

    Search.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$timeout', '$window',
    '$auth', 'commonsDataService', 'elasticsearchServiceApi', 'local_storage', 'userServiceApi'];

    /* @ngInject */
    function Search($location, $q, $rootScope, $scope, $state, $timeout, $window,
    $auth, commonsDataService, elasticsearchServiceApi, local_storage, userServiceApi) {
      var vm = this;
      console.log('jories');
      vm.clicked_items          = clicked_items;
      vm.searchResult           = searchResult;
      vm.keyword                = $rootScope.search_keyword;
      vm.change_page            = change_page;
      vm.change_keyword         = change_keyword;
      vm.is_saved_star          = is_saved_star;
      vm.isAuthenticated        = $auth.isAuthenticated();
      $rootScope.is_change_page = false;

      /*get the photo from local storage*/
      vm.photo = local_storage.getToken('photo');

      $scope.$on('search', function() {
        $timeout(function() {
          search();
        }, 0);
      });

      function clicked_items(item_id) {
        if (!vm.isAuthenticated){
          return;
        }

        $q.all([save_click_items(item_id)])
          .then(function(response) {
            return response;
          });
      }

      function save_click_items(item_id) {
        return commonsDataService
          .httpPUTQueryParams(
            'clicked_items',
            {item_id:item_id},
            userServiceApi
          ).then(function(response) {
            return response;
          });
      }

      function search() {
        /*saved the search terms link to the isEntered directive*/
        $q.all([saved_keyword()])
          .then(function(response) {
            $location.path('/search').search({q: vm.keyword, p: 1});
          });
      }

      $rootScope.$watchCollection(function() {
        if ($location.search().p) {
          return $location.search().p;
        }
      }, function(newValue, oldValue) {
          if (newValue !== oldValue) {
              $rootScope.is_change_page = !$rootScope.is_change_page;
              vm.keyword = $location.search().q;
              searchResult(newValue);
          }
        });

      $rootScope.$watchCollection(function() {
        if ($location.search().q) {
          return $location.search().q;
        }
      }, function(newValue, oldValue) {
        vm.keyword = $location.search().q;
          if (newValue !== oldValue) {
            $rootScope.is_change_page = !$rootScope.is_change_page;
            keyword_search(newValue);
          }
        }, true);

      function change_page(page, page_total) {
        if (page === 0 || (page > $rootScope.result)) {return;}
        $rootScope.is_change_page = false;
        $location.path('/search').search('q', $location.search().q).search('p', page);
      }

      function change_keyword(page) {
        if (!vm.isAuthenticated) {
          $rootScope.tempKeyword = vm.keyword;
          $location.search('q', vm.keyword).search('p', page);
        } else {
          $q.all([saved_keyword()])
            .then(function(response) {
              $rootScope.tempKeyword = vm.keyword;
              $location.search('q', vm.keyword).search('p', page);
            });
        }
      }

      function saved_keyword() {
        return commonsDataService
          .httpPUTQueryParams(
            'search_terms',
            {keyword:vm.keyword},
            userServiceApi
          ).then(function(response) {
            return response;
          });
      }

      function searchResult(page) {
        $q.all([searchCallback(page)])
          .then(function(response) {
            /*make a new pagination array*/
            $rootScope.paginateResult = [];
            $rootScope.pageTotal = parseInt(response[0].data.total);
            $rootScope.p = page;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = $rootScope.pageTotal/20;
            $rootScope.result = Math.ceil($rootScope.resultPerPage);
            // console.log($rootScope.result);
            var marginal_pagination = 20;
            var url_pagination = $location.search().p;
            var cpagination = 1;
            var end_pagination = 9;
            if ($rootScope.result > 8) {
              if (url_pagination <= marginal_pagination) {
                cpagination = 1;
              } else {
                cpagination = (parseInt(url_pagination) + 1)- marginal_pagination;
                end_pagination = cpagination + 8;
                if (end_pagination > $rootScope.result) {
                  end_pagination = $rootScope.result;
                  cpagination = $rootScope.result - 8;
                }
              }
            } else {
              end_pagination = $rootScope.result;
            }

            for (var i = cpagination; i <= end_pagination; i++) {
              $rootScope.paginateResult.push(i);
            }
            $rootScope.is_change_page = false;
            $rootScope.showStart = (((parseInt($rootScope.p) - 1) * 20) + 1);
            $rootScope.showEnd   = $rootScope.p * 20;
            if($rootScope.showEnd > $rootScope.pageTotal) {
              $rootScope.showEnd = $rootScope.pageTotal;
            }
            /*set the previous*/
            if (parseInt($rootScope.p) !== 1) {
              $rootScope.previous_hide = true;
            } else {
              $rootScope.previous_hide = false;
            }
            /*set the next*/
            if (parseInt($rootScope.p) !== $rootScope.result) {
              $rootScope.next_hide = true;
            } else {
              $rootScope.next_hide = false;
            }
            $rootScope.dash          = '-';
            $rootScope.of            = 'of';
            $rootScope.search_result = response[0].data.hits;
          });
      }

      //change in keyworkd
      function keyword_search(keyword) {
        $q.all([searchCallback($location.search().q)])
          .then(function(response) {
            /*change the tempKeyword*/
            $rootScope.tempKeyword = $location.search().q;
            /*make a new pagination array*/
            $rootScope.paginateResult = [];
            $rootScope.pageTotal = parseInt(response[0].data.total);
            $rootScope.p = $location.search().p;
            $rootScope.q = $location.search().q;
            $rootScope.resultPerPage = $rootScope.pageTotal/20;
            $rootScope.result = Math.ceil($rootScope.resultPerPage);
            // console.log($rootScope.result);
            var marginal_pagination = 20;
            var url_pagination = $location.search().p;
            var cpagination = 1;
            var end_pagination = 9;
            if ($rootScope.result > 8) {
              if (url_pagination <= marginal_pagination) {
                cpagination = 1;
              } else {
                cpagination = (parseInt(url_pagination) + 1)- marginal_pagination;
                end_pagination = cpagination + 8;
                if (end_pagination > $rootScope.result) {
                  end_pagination = $rootScope.result;
                  cpagination = $rootScope.result - 8;
                }
              }
            } else {
              end_pagination = $rootScope.result;
            }

            for (var i = cpagination; i <= end_pagination; i++) {
              $rootScope.paginateResult.push(i);
            }
            $rootScope.is_change_page = false;
            $rootScope.showStart = (((parseInt($rootScope.p) - 1) * 20) + 1);
            $rootScope.showEnd   = $rootScope.p * 20;
            if($rootScope.showEnd > $rootScope.pageTotal) {
              $rootScope.showEnd = $rootScope.pageTotal;
            }
            /*set the previous*/
            if (parseInt($rootScope.p) !== 1) {
              $rootScope.previous_hide = true;
            } else {
              $rootScope.previous_hide = false;
            }
            /*set the next*/
            if (parseInt($rootScope.p) !== $rootScope.result) {
              $rootScope.next_hide = true;
            } else {
              $rootScope.next_hide = false;
            }
            $rootScope.search_result = response[0].data.hits;
          });
      }

      function searchCallback(page) {
        return commonsDataService
          .httpGETQueryParams('search', {keyword:vm.keyword, p: page}, elasticsearchServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function is_saved_star(id, star) {
        var saved_items = local_storage.getToken('saved_items');

        var items = saved_items.indexOf(id);
        if (star === true) {
          if (items !== -1) {
            return true;
          }
        } else {
          if (saved_items === 'null') {
            return true;
          }
          if (items !== -1 && saved_items !== 'null') {
            console.log('false');
            return false;
          }
        }
      }

      vm.services = [{
        name: 'Research & Development',
        code: 'A'
      }, {
        name: 'Special studies and analysis',
        code: 'B'
      }, {
        name: 'Architect and engineering services',
        code: 'C'
      }, {
        name: 'Information technology services, including telecommunications services',
        code: 'D'
      }, {
        name: 'Purchase of structures & facilities',
        code: 'E'
      }, {
        name: 'Natural resources & conservation services',
        code: 'F'
      }, {
        name: 'Social services',
        code: 'G'
      }, {
        name: 'Quality control, testing & inspection services',
        code: 'H'
      }, {
        name: 'Maintenance, repair & rebuilding of equipments',
        code: 'J'
      }, {
        name: 'Modification of equipment',
        code: 'K'
      }, {
        name: 'Technical representative services',
        code: 'L'
      }, {
        name: 'Operation of Government-owned facilities',
        code: 'M'
      }, {
        name: 'Installation of equipment',
        code: 'N'
      }, {
        name: 'Salvage services',
        code: 'P'
      }, {
        name: 'Medical services',
        code: 'Q'
      }, {
        name: 'Professional, administrative, and management support services',
        code: 'R'
      }, {
        name: 'Utilities and housekeeping services',
        code: 'S'
      }, {
        name: 'Photographic, mapping, printing, & publication services',
        code: 'T'
      }, {
        name: 'Education & training services',
        code: 'U'
      }, {
        name: 'Transportation, travel, & relocation services',
        code: 'V'
      }, {
        name: 'Lease or Rental of equipment',
        code: 'W'
      }, {
        name: 'Lease or rental of facilities',
        code: 'X'
      }, {
        name: 'Construction of structures and facilities',
        code: 'Y'
      },  {
        name: 'Maintenance, repair, and alteration of real property',
        code: 'Z'
      }];

      vm.products = [{
        name: 'Weapons',
        code: '10'
      }, {
        name: 'Nuclear ordnance',
        code: '11'
      }, {
        name: 'Fire control equipment',
        code: '12'
      }, {
        name: 'Ammunition & explosives',
        code: '13'
      }, {
        name: 'Guided missiles',
        code: '14'
      }, {
        name: 'Aircraft & airframe structural components',
        code: '15'
      }, {
        name: 'Aircraft components & accessories',
        code: '16'
      }, {
        name: 'Aircraft launching, landing & ground handling equipment',
        code: '17'
      }, {
        name: 'Space vehicles',
        code: '18'
      }, {
        name: 'Ships, small craft, pontoons & floating docks',
        code: '19'
      }, {
        name: 'Ship and marine equipment',
        code: '20'
      }, {
        name: 'Railway equipment',
        code: '22'
      }, {
        name: 'Ground effects vehicles, motor vehicles, trailers & cycles',
        code: '23'
      }, {
        name: 'Tractors',
        code: '24'
      }, {
        name: 'Vehicular equipment components',
        code: '25'
      }, {
        name: 'Tires and tubes',
        code: '26'
      }, {
        name: 'Engines, turbines & components',
        code: '28'
      }, {
        name: 'Engine accessories',
        code: '29'
      }, {
        name: 'Mechanical power transmission equipment',
        code: '30'
      }, {
        name: 'Bearings',
        code: '31'
      }, {
        name: 'Woodworking machinery and equipment',
        code: '32'
      }, {
        name: 'Metalworking machinery',
        code: '34'
      }, {
        name: 'Service and trade equipment',
        code: '35'
      }, {
        name: 'Special industry machinery',
        code: '36'
      }, {
        name: 'Agricultural machinery & equipment',
        code: '37'
      }, {
        name: 'Construction, mining, excavating & highway maintenance equipment',
        code: '38'
      }, {
        name: 'Materials handling equipment',
        code: '39'
      }, {
        name: 'Rope, cable, chain & fittings',
        code: '40'
      }, {
        name: 'Refrigeration, air-conditioning & air circulating equipment',
        code: '41'
      }, {
        name: 'Fire fighting, rescue & safety equipment',
        code: '42'
      }, {
        name: 'Pumps & compressors',
        code: '43'
      }, {
        name: 'Furnace, steam plant & drying equipment; & nuclear reactors',
        code: '44'
      }, {
        name: 'Plumbing, heating, & sanitation equipment',
        code: '45'
      }, {
        name: 'Water purification & sewage treatment equipment',
        code: '46'
      }, {
        name: 'Pipe, tubing, hose & fittings',
        code: '47'
      }, {
        name: 'Valves',
        code: '48'
      }, {
        name: 'Maintenance & repair shop equipment',
        code: '49'
      }, {
        name: 'Hand tools',
        code: '51'
      }, {
        name: 'Measuring tools',
        code: '52'
      }, {
        name: 'Hardware & abrasives',
        code: '53'
      }, {
        name: 'Prefabricated structures and scaffolding',
        code: '54'
      }, {
        name: 'Lumber, millwork, plywood & veneer',
        code: '55'
      }, {
        name: 'Construction & building materials',
        code: '56'
      }, {
        name: 'Construction & building materials',
        code: '57'
      },  {
        name: 'Communication, detection, & coherent radiation equipment',
        code: '58'
      },  {
        name: 'Electrical and electronic equipment components',
        code: '59'
      }, {
        name: 'Fiber optics materials, components, assemblies & accessories',
        code: '60'
      }, {
        name: 'Electric wire & power & distribution equipment',
        code: '61'
      }, {
        name: 'Lighting fixtures & lamps',
        code: '62'
      }, {
        name: 'Alarm, signal & security detection equipment',
        code: '63'
      }, {
        name: 'Medical, dental & veterinary equipment & supplies',
        code: '65'
      }, {
        name: 'Instruments & laboratory equipment',
        code: '66'
      }, {
        name: 'Photographic equipment',
        code: '67'
      }, {
        name: 'Chemicals & chemical products',
        code: '68'
      }, {
        name: 'Training aids & devices',
        code: '69'
      }, {
        name: 'General purpose information technology equipment',
        code: '70'
      }, {
        name: 'Furniture',
        code: '71'
      }, {
        name: 'Household & commercial furnishings & appliances',
        code: '72'
      }, {
        name: 'Food preparation and serving equipment',
        code: '73'
      }, {
        name: 'Office machines, text processing systems & visible record equipment',
        code: '74'
      }, {
        name: 'Office supplies and devices',
        code: '75'
      }, {
        name: 'Books, maps & other publications',
        code: '76'
      }, {
        name: 'Musical instruments, phonographs & home-type radios',
        code: '77'
      }, {
        name: 'Recreational & athletic equipment',
        code: '78'
      }, {
        name: 'Cleaning equipment and supplies',
        code: '79'
      }, {
        name: 'Brushes, paints, sealers & adhesives',
        code: '80'
      }, {
        name: 'Containers, packaging, & packing supplies',
        code: '81'
      }, {
        name: 'Textiles, leather, furs, apparel & shoe findings, tents & flags',
        code: '83'
      }, {
        name: 'Clothing, individual equipment & insignia',
        code: '84'
      }, {
        name: 'Toiletries',
        code: '85'
      }, {
        name: 'Agricultural supplies',
        code: '87'
      }, {
        name: 'Live animals',
        code: '88'
      }, {
        name: 'Subsistence',
        code: '89'
      }, {
        name: 'Fuels, lubricants, oils & waxes',
        code: '91'
      }, {
        name: 'Nonmetallic fabricated materials',
        code: '93'
      }, {
        name: 'Nonmetallic crude materials',
        code: '94'
      }, {
        name: 'Metal bars, sheets & shapes',
        code: '95'
      }, {
        name: 'Ores, minerals & their primary products',
        code: '96'
      }, {
        name: 'Miscellaneous',
        code: '99'
      }];
    }
}());
