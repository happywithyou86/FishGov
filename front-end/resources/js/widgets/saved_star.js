(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('savedStar', savedStar);

    savedStar.$inject = ['$q', '$location', '$rootScope', '$timeout', '$auth', '$tooltip', 'local_storage',
    'commonsDataService', 'userServiceApi'];

    /* @ngInject */
    function savedStar($q, $location, $rootScope, $timeout, $auth, $tooltip, local_storage,
    commonsDataService, userServiceApi) {
      var directive = {
        restrict: 'AEC',
        scope :{savedStar:'@' },
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var item_id,
            item_result,
            position,
            saved_items;
        var title,
            keyword,
            solnbr,
            due_date,
            agency,
            posted_date,
            office,
            description;

        var isAuthenticated = $auth.isAuthenticated();
        if (!isAuthenticated) {
          return;
        }

        scope.$watch('savedStar',function(newValue,oldValue) {
          saved_items     = JSON.parse(local_storage.getToken('saved_items'));
          item_result     = JSON.parse(attrs.savedStar);
          item_id         = item_result._id;

          /*test if we have item_id present*/
          if (item_result.item_id !== undefined) {
            item_id     = item_result.item_id;
            title       = item_result.title;
            keyword     = item_result.keyword;
            solnbr      = item_result.solnbr;
            due_date    = item_result.close_date;
            agency      = item_result.agency;
            posted_date = item_result.posted_date;
            office      = item_result.office;
            description = item_result.description;
          } else {
            title       = item_result._source.title;
            keyword     = $location.search().q;
            solnbr      = item_result._source.solnbr;
            due_date    = item_result._source.close_date;
            agency      = item_result._source.agency;
            posted_date = item_result._source.posted_date;
            office      = item_result._source.office;
            description = item_result.highlight.description[0] !== null ? item_result.highlight.description[0] : $rootScope.description;
          }

          position  = saved_items.indexOf(item_id);
          if (position !== -1) {
            element.removeClass('fa-star-o');
            element.addClass('fa-star');
          } else {
            element.removeClass('fa-star');
            element.addClass('fa-star-o');
          }
        });


        // var saved_items     = JSON.parse(local_storage.getToken('saved_items')),
        //     item_result     = JSON.parse(attrs.savedStar);
        //     item_id         = item_result._id;
        //
        // var position        = saved_items.indexOf(item_id);


        // var position        = saved_items.indexOf(item_id);
        //
        // if (position !== -1) {
        //   element.removeClass('fa-star-o');
        //   element.addClass('fa-star');
        // }

        element.on('click', function() {
          var hasClass = element.hasClass('fa-star-o');
          if (hasClass) {
            element.removeClass('fa-star-o');
            element.addClass('fa-star');

            /*set the localStorage again for the saved_items*/
            saved_items = JSON.parse(local_storage.getToken('saved_items'));
            local_storage.removeToken('saved_items');
            console.log(item_id);
            saved_items.push(item_id);
            saved_items = local_storage.setToken('saved_items', JSON.stringify(saved_items));

            /*increment the count star*/
            $rootScope.saved_count += 1;
            /*save the star items*/
            $q.all([saved_items_data(item_id)])
              .then(function(response) {
                return response;
              });
          } else {
            /*delete the star item*/
            element.addClass('fa-star-o');
            element.removeClass('fa-star');
            /*delete the user_id in the localStorage*/
            saved_items     = JSON.parse(local_storage.getToken('saved_items'));
            saved_items.splice(position, 1);
            local_storage.removeToken('saved_items');
            saved_items = local_storage.setToken('saved_items', JSON.stringify(saved_items));
            /*decrement the count star*/
            $rootScope.saved_count -= 1;
            /*delete the star items*/
            $q.all([saved_items_delete(item_id)])
              .then(function(response) {
                return response;
              });
          }
        });


        var fa_star_o = $tooltip(element, {
          title: 'Save',
          placement: 'bottom',
          container: 'body'
        });

        var fa_star = $tooltip(element, {
          title: 'Unsave',
          placement: 'bottom',
          container: 'body'
        });

        fa_star.setEnabled(false);
        fa_star_o.setEnabled(false);
        element.hover(function() {
          if (element.hasClass('fa-star-o')) {
            $timeout(function() {
              console.log(fa_star_o);
              fa_star.setEnabled(false);
              fa_star_o.setEnabled(true);
              fa_star_o.show();
            });
          } else {
            $timeout(function() {
              fa_star.setEnabled(true);
              fa_star_o.setEnabled(false);
              fa_star.show();
            });
          }
        }, function() {
          fa_star.setEnabled(false);
          fa_star_o.setEnabled(false);
        });

        function saved_items_data(item_id) {
          commonsDataService
            .httpPOSTQueryParams(
              'saved_items', {
                item_id     : item_id,
                title       : title,
                keyword     : keyword,
                solnbr      : solnbr,
                due_date    : due_date,
                agency      : agency,
                posted_date : posted_date,
                office      : office,
                description : description
              },
              userServiceApi
            ).then(function(response) {
              return response;
            });
        }

        function saved_items_delete(item_id) {
          commonsDataService
            .httpDELETEQueryParams(
              'saved_items',
              {item_id: item_id},
              userServiceApi
            ).then(function(response) {
              return response;
            });
        }
      }
    }
}());
