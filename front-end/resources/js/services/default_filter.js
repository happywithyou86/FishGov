(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('default_filter', default_filter);

    default_filter.$inject = ['$location', '$rootScope', '$timeout', 'oboe_data_service'];
    /*@ngInject*/
    function default_filter($location, $rootScope, $timeout, oboe_data_service) {
      return {
        get: function() {
          console.log('default filter');
          $rootScope.services_filter = [];
          $rootScope.products_filter = [];

          oboe_data_service.stream({
            url   : 'filterApi/search/filter/services',
            method: 'POST',
            body  : {
              option_val: {
                is_award      : $rootScope.is_award,
                is_sole_source: $rootScope.is_sole_source
              }
            }
          })
            .node('data.*', function(response) {
              $timeout(function() {
                $rootScope.services_filter.push(response);
              }, 0);
            }).done(function(response) {
              $timeout(function() {
                $rootScope.noOfServices = response.data.length;
                if ($rootScope.fromStateUrl === 'search_item') {
                  $rootScope.watchfilterChangesCounter      = 0;
                }
              }, 0);
            });

          oboe_data_service
            .stream({
              url   : 'filterApi/search/filter/products',
              method: 'POST',
              body  : {
                option_val: {
                  is_award      : $rootScope.is_award,
                  is_sole_source: $rootScope.is_sole_source
                }
              }
            })
            .node('data.*', function(response) {
              $timeout(function() {
                $rootScope.products_filter.push(response);
              }, 0);
            }).done(function(response) {
              $timeout(function() {
                $rootScope.noOfProducts = response.data.length;
                if ($rootScope.fromStateUrl === 'search_item') {
                  $rootScope.watchfilterChangesCounter      = 0;
                }
              }, 0);
            });
        }
      };
    }
}());
