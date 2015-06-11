(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('Search', Search);

    Search.$inject = ['$location', '$q', '$rootScope', '$scope', '$state', '$timeout', '$window',
    '$auth', 'commonsDataService', 'elasticsearchServiceApi', 'local_storage', 'oboe_data_service', 'userServiceApi'];

    /* @ngInject */
    function Search($location, $q, $rootScope, $scope, $state, $timeout, $window,
    $auth, commonsDataService, elasticsearchServiceApi, local_storage, oboe_data_service, userServiceApi) {
      var vm = this;
      vm.clicked_items          = clicked_items;
      vm.searchResult           = searchResult;
      vm.keyword                = $rootScope.search_keyword;
      vm.change_page            = change_page;
      vm.change_keyword         = change_keyword;
      vm.isAuthenticated        = $auth.isAuthenticated();
      $rootScope.is_change_page = false;
      $rootScope.watchfilterChangesCounter    = 0;
      $rootScope.watchfilterChangesCounterNull = 0;
      $rootScope.services_count_check = 0;
      $rootScope.products_count_check = 0;

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
            if ($location.search().f === undefined) {
              searchResult(newValue);
              console.log('p');
            }
            // console.log($rootScope.is_change_page);
            // console.log($location.search().f);
            // if ($rootScope.is_change_page === false && $location.search().f !== undefined) {
            //   console.log('true');
            //   searchResult(newValue);
            // }
          }
        });

      $rootScope.$watchCollection(function() {
        // $location.search().p === undefined
        if ($location.search().q) {
          return $location.search().q;
        }
      }, function(newValue, oldValue) {
        vm.keyword = $location.search().q;
          if (newValue !== oldValue) {
            $rootScope.is_change_page = !$rootScope.is_change_page;
            keyword_search(newValue);
            console.log('q');

            // if ($location.search().f !==)
            if ($location.search().f === undefined) {
              filter_keyword();
            }
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
          .httpGETQueryParams('search', {
            asc: $location.search().asc,
            keyword:vm.keyword,
            p: page
          }, elasticsearchServiceApi)
          .then(function(response) {
            return response;
          });
      }

      function filter_keyword() {
        $rootScope.services_filter = [];
        $rootScope.products_filter = [];
        $rootScope.noOfServices = 0;
        $rootScope.noOfProducts = 0;
        oboe_data_service
          .stream({
            url   : 'filterApi/search/services/keyword',
            method: 'POST',
            body  : {
              keyword: vm.keyword,
            }
          }).node('data.*', function(response) {
            $timeout(function() {
              $rootScope.services_filter.push(response);
            }, 0);
          }).done(function(response) {
            $timeout(function () {
              $rootScope.noOfServices = response.data.length;
            }, 0);
          });

          oboe_data_service
            .stream({
              url   : 'filterApi/search/products/keyword',
              method: 'POST',
              body  : {
                keyword: vm.keyword,
              }
            }).node('data.*', function(response) {
              $timeout(function() {
                $rootScope.products_filter.push(response);
              }, 0);
            }).done(function(response) {
              $timeout(function() {
                $rootScope.noOfProducts = response.data.length;
              }, 0);
            });
      }

      /*watch for changes*/
      // $rootScope.$watchCollection(function() {
      //   if ($location.search().f !== undefined) {
      //     console.log('watch');
      //     if ($location.search().f || $location.search().p) {
      //       return {f: $location.search().f, p: $location.search().p};
      //     }
      //   }
      // }, function(newValue, oldValue) {
      //     if (newValue !== oldValue) {
      //       if ($location.search().f !== undefined) {
      //         data_filter = $location.search().f.split('&');
      //         $rootScope.classification = data_filter;
      //         if (data_filter.indexOf(attrs.code) !== -1) {
      //           $timeout(function() {
      //             element.radiocheck('check');
      //           }, 0);
      //         } else {
      //           $timeout(function() {
      //             element.radiocheck('uncheck');
      //           }, 0);
      //         }
      //         http_get_oboe();
      //       } else {
      //         $rootScope.classification = [];
      //         $timeout(function() {
      //           element.radiocheck('uncheck');
      //         }, 0);
      //         http_get_oboe();
      //       }
      //     }
      //   });

      // function is_saved_star(id, star) {
      //   var saved_items = local_storage.getToken('saved_items');
      //
      //   var items = saved_items.indexOf(id);
      //   if (star === true) {
      //     if (items !== -1) {
      //       return true;
      //     }
      //   } else {
      //     if (saved_items === 'null') {
      //       return true;
      //     }
      //     if (items !== -1 && saved_items !== 'null') {
      //       console.log('false');
      //       return false;
      //     }
      //   }
      // }
    }
}());
