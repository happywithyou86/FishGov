(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('checkBox', checkBox);

    checkBox.$inject = ['$location', '$rootScope', '$state', '$timeout', 'oboe_data_service'];

    /* @ngInject */
    function checkBox($location, $rootScope, $state, $timeout, oboe_data_service) {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        $rootScope.classification = [];
        element.radiocheck();

        element.on('click', function(event) {
          /*individual click*/
          if (attrs.check === 'false') {
            /*set the new location for the filter*/
            $timeout(function() {
              $location.search().p = 1;
              $location.path('/search').search({
                asc: $location.search().asc,
                q: $location.search().q,
                p: $location.search().p,
                f: $location.search().f === undefined ? attrs.code: $location.search().f + '&' + attrs.code
              });
              attrs.check = 'true';
            }, 0);

            $rootScope.classification.push(attrs.code);
            /*test if all the services all selected*/
            if (attrs.checkBox === 'services') {
              $rootScope.services_count_check++;
              console.log($rootScope.services_count_check);
            } else {
              $rootScope.products_count_check++;
              console.log($rootScope.products_count_check);
            }

            if ($rootScope.services_count_check === $rootScope.noOfServices) {
              $rootScope.isServicesSelectedAll  = true;
              // $rootScope.services_count_check   = 1;
            } else {
              $rootScope.isServicesSelectedAll = false;
            }

            if ($rootScope.products_count_check === $rootScope.noOfProducts) {
              console.log('true products selected all');
              $rootScope.isProductsSelectedAll = true;
              //$rootScope.products_count_check  = 1;
            } else {
              $rootScope.isProductsSelectedAll = false;
            }
          } else {
            /*check for uncheck services checkbox*/
            if (attrs.checkBox === 'services') {
              $rootScope.services_count_check--;
              $rootScope.isServicesSelectedAll = false;
              console.log($rootScope.services_count_check);
            } else {
              $rootScope.products_count_check--;
              console.log($rootScope.products_count_check);
              $rootScope.isProductsSelectedAll = false;
            }
            /**/
            var f_location = $location.search().f;
            /*check if we have 1 check filter*/
            f_location = f_location.replace('&' + attrs.code, '');
            f_location = f_location.replace(attrs.code + '&', '');
            if ($rootScope.classification.length === 1) {
              f_location = f_location.replace(attrs.code, '');
            }

            $timeout(function() {
              $location.path('/search').search({
                asc: $location.search().asc,
                q: $location.search().q,
                p: $location.search().p,
                f: f_location === '' ? undefined : f_location
              });
              attrs.check = 'false';
            }, 0);

            var position = $rootScope.classification.indexOf(attrs.code);
            $rootScope.classification.splice(position, 1);

            if ($rootScope.classification.length === 0 && $rootScope.fromStateUrl === 'search_item') {
              http_get_oboe();
            }
          }
        });/*end of click*/

        /*check for the url search f*/
        var data_filter;
        if ($location.search().f !== undefined) {
          data_filter = $location.search().f.split('&');
          if (data_filter.indexOf(attrs.code) !== -1) {
            $timeout(function() {
              element.radiocheck('check');
              $rootScope.classification.push(attrs.code);
              attrs.check = 'true';

              if (attrs.checkBox === 'services') {
                $rootScope.services_count_check++;
              } else {
                $rootScope.products_count_check++;
              }
              /*test if the data_filter.length === $rootScope.classification*/
              if (data_filter.length === $rootScope.classification.length) {
                if ($rootScope.services_count_check === $rootScope.noOfServices) {
                  $rootScope.isServicesSelectedAll = true;
                }
                if ($rootScope.products_count_check === $rootScope.noOfProducts) {
                  $rootScope.isProductsSelectedAll = true;
                }
                http_get_oboe();
              }
            }, 0);
          }
        } else {
          /*f is undefined*/
          $timeout(function() {
            $rootScope.watchfilterChangesCounter++;
            if ($rootScope.watchfilterChangesCounter === ($rootScope.noOfServices + $rootScope.noOfProducts)) {
              /*happens when we reload the search without the f*/
              $rootScope.watchfilterChangesCounter = 0;
              http_get_oboe();
            }
          }, 0);
        }

        /*listen for all_services*/
        scope.$on('services', function(event, data) {
          if (data.bool === false) {
            if (attrs.checkBox === 'services') {
              if (attrs.check === 'true') {
                attrs.check = 'false';
                element.radiocheck('uncheck');
                $rootScope.services_count_check--;
                /*check if we have 1 check filter*/
                data.f_location = data.f_location.replace('&' + attrs.code, '');
                data.f_location = data.f_location.replace(attrs.code + '&', '');
                if ($rootScope.classification.length === 1) {
                  data.f_location = data.f_location.replace(attrs.code, '');
                }
              } else {
                attrs.check = 'true';
                element.radiocheck('check');
                //$rootScope.click_count_service_filter_false++;
              }
              var position = $rootScope.classification.indexOf(attrs.code);
              $rootScope.classification.splice(position, 1);
              if ($rootScope.services_count_check === 0) {
                $timeout(function() {
                  $rootScope.click_count_service_filter_false = 0;
                  $location.path('/search').search({
                    asc: $location.search().asc,
                    q: $location.search().q,
                    p: $location.search().p,
                    f: data.f_location === '' ? undefined : data.f_location
                  });
                  if ($location.search().f === undefined) {
                    /*this one will be delete because it is not-needed anymore*/
                    /*because of the watch of filter*/
                    //http_get_oboe();
                  }
                }, 0);
              }

            }
          } else {
            if (attrs.checkBox === 'services') {
              if(attrs.check === 'false') {
                attrs.check = 'true';
                $rootScope.services_count_check++;
                element.radiocheck('check');
                $rootScope.classification.push(attrs.code);
                if($rootScope.classification.length === 1) {
                  data.f_location = attrs.code;
                } else {
                  data.f_location += '&' + attrs.code;
                }
              } else {
                /*use for the check filter*/
                attrs.check = 'false';
                element.radiocheck('uncheck');
                /*this one is not needed because it is already check*/
                // $rootScope.click_count_service_filter_true++;
              }
              if ($rootScope.noOfServices  === $rootScope.services_count_check) {
                $timeout(function() {
                  $location.path('/search').search({
                    asc: $location.search().asc,
                    q: $location.search().q,
                    p: $location.search().p,
                    f: data.f_location
                  });
                }, 0);
              }
            }
          }
        });

        /*listen to all products*/
        $rootScope.click_count_product_filter_true = 0;
        $rootScope.click_count_product_filter_false = 0;
        scope.$on('products', function(event, data) {
          if (data.bool === false) {
            if (attrs.checkBox === 'products') {
              if (attrs.check === 'true') {
                attrs.check = 'false';
                element.radiocheck('uncheck');
                /*use to iterate the check items*/
                $rootScope.products_count_check--;
                /*check if we have 1 check filter*/
                data.f_location = data.f_location.replace('&' + attrs.code, '');
                data.f_location = data.f_location.replace(attrs.code + '&', '');
                if ($rootScope.classification.length === 1) {
                  data.f_location = data.f_location.replace(attrs.code, '');
                }
              }
              var position = $rootScope.classification.indexOf(attrs.code);
              $rootScope.classification.splice(position, 1);

              if ($rootScope.products_count_check === 0){
                $timeout(function() {
                  $location.path('/search').search({
                    asc: $location.search().asc,
                    q: $location.search().q,
                    p: $location.search().p,
                    f: data.f_location === '' ? undefined : data.f_location
                  });
                  if ($location.search().f === undefined) {
                    /*this one will be delete because it is not-needed anymore*/
                    /*because of the watch of filter*/
                    //http_get_oboe();
                  }
                }, 0);
              }

            }
          } else {
            console.log(false);
            if (attrs.checkBox === 'products') {
              if(attrs.check === 'false') {
                attrs.check = 'true';
                element.radiocheck('check');
                $rootScope.products_count_check++;
                $rootScope.classification.push(attrs.code);
                if($rootScope.classification.length === 1) {
                  data.f_location = attrs.code;
                } else {
                  data.f_location += '&' + attrs.code;
                }
              }

              if ($rootScope.noOfProducts === $rootScope.products_count_check) {
                $timeout(function() {
                  $location.path('/search').search({
                    asc: $location.search().asc,
                    q: $location.search().q,
                    p: $location.search().p,
                    f: data.f_location
                  });
                }, 0);
              }
            }
          }
        });

        /*watch for changes*/
        var data_filter;
        $rootScope.$watchCollection(function() {
          if ($location.search().f) {
            return {f: $location.search().f};
          }
        }, function(newValue, oldValue) {
            if (newValue !== oldValue && $rootScope.toStateUrl !== 'search_item') {
              if ($location.search().f !== undefined) {
                data_filter = $location.search().f.split('&');
                $rootScope.classification = data_filter;
                if (data_filter.indexOf(attrs.code) !== -1) {
                  $timeout(function() {
                    $rootScope.watchfilterChangesCounter++;
                    element.radiocheck('check');
                    attrs.check = 'true';

                    /*check if we iterate for all filters*/
                    /*so that one request will be made*/
                    if ($rootScope.watchfilterChangesCounter === ($rootScope.noOfServices + $rootScope.noOfProducts)) {
                      $rootScope.watchfilterChangesCounter      = 0;
                      http_get_oboe();
                    }
                  }, 0);
                } else {
                  $timeout(function() {
                    $rootScope.watchfilterChangesCounter++;
                    element.radiocheck('uncheck');
                    attrs.check = 'false';

                    /*check if we iterate for all filters*/
                    /*so that one request will be made*/
                    if ($rootScope.watchfilterChangesCounter === ($rootScope.noOfServices + $rootScope.noOfProducts)) {
                      $rootScope.watchfilterChangesCounter      = 0;
                      http_get_oboe();
                    }
                  }, 0);
                }

              } else {
                $rootScope.watchfilterChangesCounterNull++;
                $rootScope.classification = [];
                $timeout(function() {
                  element.radiocheck('uncheck');
                  attrs.check = 'false';
                }, 0);

                $timeout(function() {
                  if ($rootScope.watchfilterChangesCounterNull === ($rootScope.noOfServices + $rootScope.noOfProducts)) {
                    http_get_oboe();
                    $rootScope.watchfilterChangesCounterNull = 0;
                  }
                }, 0);
              }
            }
          }, true);

        function http_get_oboe() {
          /*query oboe.js*/
          if($rootScope.toStateUrl === 'search_item') {
            console.log('oboe call for the results and total(filter not included) when search_filter toStateUrl');
            return;
          }
          oboe_data_service
            .stream({
              url   : 'filterApi/search/filter_change',
              method: 'POST',
              body  : {
                filter: $rootScope.classification,
                keyword: $location.search().q,
                fromPage : $location.search().p
              }
            })
            .done(function(response) {
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
