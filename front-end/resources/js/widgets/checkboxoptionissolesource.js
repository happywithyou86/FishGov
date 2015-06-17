(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('checkBoxOptionIsSoleSource', checkBoxOptionIsSoleSource);

    checkBoxOptionIsSoleSource.$inject = ['$location', '$rootScope', '$timeout', 'default_filter',
    'default_result', 'oboe_data_service'];

    function checkBoxOptionIsSoleSource($location, $rootScope, $timeout, default_filter,
      default_result, oboe_data_service) {
      var directive = {
        restrict: 'A',
        link    : link
      };

      return directive;

      function link(scope, element, attrs) {
        element.radiocheck();
        $rootScope.option         = [];
        $rootScope.is_sole_source = false;

        /*local variable*/
        var data_filter = [];

        element.on('click', function() {
          var option_location = $location.search().option;
          /*Reset our filter*/
          scope.$broadcast('reset_filter');
          if (attrs.check === 'false') {
            attrs.check         = 'true';
            $rootScope.is_sole_source = true;
            element.radiocheck('check');
            $rootScope.option.push('is_sole_source');
            $timeout(function() {
              $location.path('/search').search({
                asc: $location.search().asc,
                q: $location.search().q,
                p: $location.search().p,
                f: $location.search().f,
                option: $location.search().option === undefined ? 'is_sole_source' : $location.search().option +
                '&is_sole_source'
              });
            }, 0);
          } else {
            attrs.check         = 'false';
            $rootScope.is_sole_source = false;
            element.radiocheck('uncheck');

            /*clear our is_award query string*/
            option_location   = $location.search().option;
            option_location   = option_location.replace('&' + 'is_sole_source', '');
            option_location   = option_location.replace('is_sole_source' + '&', '');
            if ($rootScope.option.length === 1) {
              option_location = option_location.replace('is_sole_source', '');
            }

            $timeout(function() {
              $location.path('/search').search({
                asc: $location.search().asc,
                q: $location.search().q,
                p: $location.search().p,
                f: $location.search().f,
                option: option_location === '' ? undefined : option_location
              });
            }, 0);

            var position = $rootScope.option.indexOf('is_sole_source');
            $rootScope.option.splice(position, 1);
            $rootScope.is_sole_source = false;
          }
        });

        scope.$watchCollection(function() {
          if ($location.search().option) {
            data_filter = $location.search().option.split('&');
            if (data_filter.indexOf('is_sole_source') !== -1) {
              return 'is_sole_source';
            } else {
              return undefined;
            }
          }
        }, function(newValue, oldValue) {
          /*use if we refresh our browser and newValue and oldValue is not undefined*/
          if (newValue === oldValue && newValue !== undefined && oldValue !== undefined) {
            data_filter = $location.search().option.split('&');
              if (data_filter.indexOf('is_sole_source') !== -1) {
                $timeout(function() {
                  attrs.check               = 'true';
                  $rootScope.is_sole_source = true;
                  element.radiocheck('check');
                  $rootScope.option.push('is_sole_source');
                  if (data_filter.length === 2) {
                    /*Use to prevent redundant request when we reload our browser for check checkbox*/
                    /*checkBoxOptionIsAward directive will do the request*/
                    return;
                  }
                  default_filter.get();
                  /*We activate this upon reload when filter(f) is undefined*/
                  /*to avoid redundant call*/
                  if ($location.search().f === undefined) {default_result.get('checkBoxOptionIsSoleSource', 103);}
                }, 0);
              }
          }

          if (newValue !== oldValue) {
            $rootScope.watchOptionCounter++;
            /*check if we have undefined option*/
            if ($location.search().option === undefined) {
              $timeout(function() {
                element.radiocheck('uncheck');
                attrs.check = 'false';
              }, 0);

              if ($rootScope.watchOptionCounter === 1) {
                $rootScope.watchOptionCounter = 0;
                default_filter.get();
                default_result.get('checkBoxOptionIsSoleSource', 121);
              }
              return;
            }

            data_filter = $location.search().option.split('&');
            if (data_filter.indexOf('is_sole_source') !== -1) {
              attrs.check               = 'true';
              $rootScope.is_sole_source = true;
              element.radiocheck('check');
            } else {
              element.radiocheck('uncheck');
              attrs.check               = 'false';
              $rootScope.is_sole_source = false;
            }

            if ($rootScope.watchOptionCounter === 1) {
              $rootScope.watchOptionCounter = 0;
              console.log('true');
              default_filter.get();
              default_result.get('checkBoxOptionIsSoleSource', 140);
            }
          }
        });
      }
    }
}());
