(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('default_result', default_result);

    default_result.$inject = ['$location', '$rootScope', '$timeout', 'oboe_data_service'];
    /*@ngInject*/
    function default_result($location, $rootScope, $timeout, oboe_data_service) {

      var results =  {
        get: function(name, num) {
          console.log('call from ' + name + ' line number ' + num);
          $rootScope.search_result = [];
          oboe_data_service
            .stream({
              url   : 'filterApi/search/filter_change',
              method: 'POST',
              body  : {
                asc       : $location.search().asc,
                filter    : $rootScope.classification || [],
                option    : $rootScope.option || [],
                keyword   : $location.search().q,
                fromPage  : $location.search().p,
                option_val: {
                  is_award      : $rootScope.is_award,
                  is_sole_source: $rootScope.is_sole_source
                }
              }
            })
            .node('data.hits.*', function(response) {
              $timeout(function() {
                $rootScope.search_result.push(response);
              }, 0);
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
                // $rootScope.search_result = response.data.hits;
              }, 0);
            });
        }
      };

      return results;
    }
}());
