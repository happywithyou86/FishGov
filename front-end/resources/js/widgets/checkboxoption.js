(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('checkBoxOption', checkBoxOption);

    checkBoxOption.$inject = ['$location', '$rootScope', '$timeout', 'oboe_data_service'];

    function checkBoxOption($location, $rootScope, $timeout, oboe_data_service) {
      var directive = {
        restrict: 'A',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        element.radiocheck();
        $rootScope.is_award       = false;
        $rootScope.option         = [];
        $rootScope.is_award       = false;
        $rootScope.is_sole_source = false;

        element.on('click', function() {
          var option_location = $location.search().option;
          if (attrs.checkBoxOption === 'is_award') {
            if (attrs.check === 'false') {
              attrs.check         = 'true';
              $rootScope.is_award = true;
              element.radiocheck('check');
              $rootScope.option.push('is_award');
              $timeout(function() {
                $location.path('/search').search({
                  asc: $location.search().asc,
                  q: $location.search().q,
                  p: $location.search().p,
                  f: $location.search().f,
                  option: $location.search().option === undefined ? 'is_award' : $location.search().option + '&is_award'
                });
              }, 0);
            } else {
              attrs.check         = 'false';
              $rootScope.is_award = false;
              element.radiocheck('uncheck');

              /*clear our is_award query string*/
              option_location     = $location.search().option;
              option_location   = option_location.replace('&' + 'is_award', '');
              option_location   = option_location.replace('is_award' + '&', '');
              console.log($rootScope.option.length);
              if ($rootScope.option.length === 1) {
                option_location = option_location.replace('is_award', '');
              }
              console.log($rootScope.option.length );
              $timeout(function() {
                $location.path('/search').search({
                  asc: $location.search().asc,
                  q: $location.search().q,
                  p: $location.search().p,
                  f: $location.search().f,
                  option: option_location === '' ? undefined : option_location
                });
              }, 0);

              var position = $rootScope.option.indexOf('is_award');
              $rootScope.option.splice(position, 1);
              $rootScope.is_award = false;
            }
          } else {
            if (attrs.check === 'false') {
              attrs.check               = 'true';
              $rootScope.is_sole_source = true;
              element.radiocheck('check');
              $rootScope.is_sole_source = true;
              $rootScope.option.push('is_sole_source');
              $timeout(function() {
                $location.path('/search').search({
                  asc   : $location.search().asc,
                  q     : $location.search().q,
                  p     : $location.search().p,
                  f     : $location.search().f,
                  option: $location.search().option === undefined ? 'is_sole_source' : $location.search().option + '&is_sole_source'
                });
              }, 0);
            } else {
              attrs.check               = 'false';
              $rootScope.is_sole_source = false;
              element.radiocheck('uncheck');

              /*clear our is_award query string*/
              option_location   = $location.search().option;
              option_location   = option_location.replace('&' + 'is_sole_source', '');
              option_location   = option_location.replace('is_sole_source' + '&', '');
              if ($rootScope.option.length === 1) {
                option_location = option_location.replace('is_sole_source', '');
              }
              console.log($rootScope.option.length );
              $timeout(function() {
                $location.path('/search').search({
                  asc   : $location.search().asc,
                  q     : $location.search().q,
                  p     : $location.search().p,
                  f     : $location.search().f,
                  option: option_location === '' ? undefined : option_location
                });
              }, 0);

              var position = $rootScope.option.indexOf('is_sole_source');
              $rootScope.option.splice(position, 1);
              $rootScope.is_sole_source = false;
            }
          }
        });

        /*listen to the option filter upon reload*/
        var data_filter;
        if ($location.search().option !== undefined) {
          data_filter = $location.search().option.split('&');
          if (data_filter.indexOf(attrs.checkBoxOption) !== -1) {
            $timeout(function() {
              attrs.check = 'true';
              element.radiocheck('check');
              $rootScope.option.push(attrs.checkBoxOption);
              if (attrs.checkBoxOption === 'is_award') {
                $rootScope.is_award = true;
              } else {
                $rootScope.is_sole_source = true;
              }

              if (data_filter.length === $rootScope.option.length) {
                console.log('true');
              }
            }, 0);
          }
        }

        var data_filter;
        $rootScope.$watchCollection(function() {
          if ($location.search().option) {
            return {option: $location.search().option};
          }
        }, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $rootScope.watchOptionCounter++;
            /*check if we have undefined option*/
            if ($location.search().option === undefined) {
              $timeout(function() {
                element.radiocheck('uncheck');
                attrs.check = 'false';
              }, 0);

              if ($rootScope.watchOptionCounter === 2) {
                $rootScope.watchOptionCounter = 0;
                console.log('true');
                http_get_oboe();
                filter();
              }
              return;
            }

            data_filter = $location.search().option.split('&');
            console.log(data_filter);
            if (data_filter.indexOf(attrs.checkBoxOption) !== -1) {
              element.radiocheck('check');
              attrs.check = 'true';
              if (attrs.checkBoxOption === 'is_award') {
                $rootScope.is_award = true;
              } else {
                $rootScope.is_sole_source = true;
              }
            } else {
              element.radiocheck('uncheck');
              attrs.check = 'false';
              if (attrs.checkBoxOption === 'is_sole_source') {
                $rootScope.is_sole_source = false;
              } else {
                $rootScope.is_award = false;
              }
            }
            if ($rootScope.watchOptionCounter === 2) {
              $rootScope.watchOptionCounter = 0;
              console.log('true');
              http_get_oboe();
              filter();
            }
          }
        });

        function filter() {
          $rootScope.services_filter = [];
          $rootScope.products_filter = [];
          $rootScope.noOfServices = 0;
          $rootScope.noOfProducts = 0;
          // 'filterApi/search/filter/services'
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

        function http_get_oboe() {
          oboe_data_service
            .stream({
              url   : 'filterApi/search/filter_change',
              method: 'POST',
              body  : {
                asc       : $location.search().asc,
                filter    : $rootScope.classification,
                option    : $rootScope.option,
                keyword   : $location.search().q,
                fromPage  : $location.search().p,
                option_val: {
                  is_award      : $rootScope.is_award,
                  is_sole_source: $rootScope.is_sole_source
                }
              }
            })
            .done(function(response) {
              console.log('checkbox');
              $timeout(function() {
                /*make a new pagination array*/
                $rootScope.paginateResult = [];
                $rootScope.pageTotal = parseInt(response.data.total);
                /*get the new page number if we check and unselect*/
                // $rootScope.pageTotal/20
                //$location.search().p = 1;
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
                $rootScope.dash          = '-';
                $rootScope.of            = 'of';
                $rootScope.search_result = response.data.hits;
              }, 0);
            });
        }
      }
    }
}());
