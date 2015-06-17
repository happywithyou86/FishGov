(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('checkBox', checkBox);

    checkBox.$inject = ['$location', '$rootScope', '$state', '$timeout', 'default_result', 'oboe_data_service'];

    /* @ngInject */
    function checkBox($location, $rootScope, $state, $timeout, default_result, oboe_data_service) {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        $rootScope.classification = [];
        var data_filter           = [];
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
                f: $location.search().f === undefined ? attrs.code: $location.search().f + '&' + attrs.code,
                option: $location.search().option
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
                f: f_location === '' ? undefined : f_location,
                option: $location.search().option
              });
              attrs.check = 'false';
            }, 0);

            var position = $rootScope.classification.indexOf(attrs.code);
            $rootScope.classification.splice(position, 1);

            if ($rootScope.classification.length === 0 && $rootScope.fromStateUrl === 'search_item') {
              default_result.get('checkbox', 99);
            }
          }
        });/*end of click*/

        /*listen for all_services*/
        scope.$on('services', function(event, data) {
          if (data.bool === false && attrs.checkBox === 'services') {
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
            }
            var position = $rootScope.classification.indexOf(attrs.code);
            $rootScope.classification.splice(position, 1);
            if ($rootScope.services_count_check === 0) {
              $timeout(function() {
                $location.path('/search').search({
                  asc: $location.search().asc,
                  q: $location.search().q,
                  p: $location.search().p,
                  f: data.f_location === '' ? undefined : data.f_location,
                  option: $location.search().option
                });
              }, 0);
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
              }
              if ($rootScope.noOfServices  === $rootScope.services_count_check) {
                $timeout(function() {
                  $location.path('/search').search({
                    asc: $location.search().asc,
                    q: $location.search().q,
                    p: $location.search().p,
                    f: data.f_location,
                    option: $location.search().option
                  });
                }, 0);
              }
            }
          }
        });

        /*listen to all products*/
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
                    f: data.f_location === '' ? undefined : data.f_location,
                    option: $location.search().option
                  });
                }, 0);
              }

            }
          } else {
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
                    f: data.f_location,
                    option: $location.search().option
                  });
                }, 0);
              }
            }
          }
        });

        /*reset_filter*/
        scope.$on('reset_filter', function() {
          console.log('reset');
          attrs.check = 'false';
          element.radiocheck('uncheck');
          $rootScope.classification         = [];
          $rootScope.products_count_check   = 0;
          $rootScope.services_count_check   = 0;
          $location.search().f              = undefined;
          $location.search().p              = 1;
          $rootScope.isProductsSelectedAll  = false;
          $rootScope.isServicesSelectedAll  = false;
        });

        /*watch for changes*/
        scope.$watchCollection(function() {
          if ($location.search()) {
            return $location.search().f;
          }
        }, function(newValue, oldValue) {
          /*use if we refresh our browser and newValue and oldValue is not undefined*/
          if (newValue === oldValue && newValue !== undefined && oldValue !== undefined) {
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
                  console.log('url check');
                  default_result.get('checkBox', 272);
                }
              }, 0);
            }
          }
            if (newValue !== oldValue) {
              if ($location.search().f === undefined) {
                /*use when f is undefined*/
                $rootScope.watchfilterChangesCounterNull++;
                $rootScope.classification = [];
                $timeout(function() {
                  element.radiocheck('uncheck');
                  attrs.check = 'false';
                }, 0);

                if ($rootScope.watchfilterChangesCounterNull === ($rootScope.noOfServices + $rootScope.noOfProducts)) {
                  $rootScope.watchfilterChangesCounterNull = 0;
                  default_result.get('checkbox', 277);
                  return;
                }
              }

              /*Used for make a new request after a user click a filter*/
              $rootScope.watchfilterChangesCounter++;
              if ($rootScope.watchfilterChangesCounter === ($rootScope.noOfServices + $rootScope.noOfProducts)) {
                $rootScope.watchfilterChangesCounter = 0;
                default_result.get('checkbox', 286);
              }
            }
          }, true);
      }
    }
}());
