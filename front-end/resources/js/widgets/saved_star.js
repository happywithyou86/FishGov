(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('savedStar', savedStar);

    savedStar.$inject = ['$q', '$timeout', '$auth', '$tooltip', 'local_storage',
    'commonsDataService', 'userServiceApi'];

    /* @ngInject */
    function savedStar($q, $timeout, $auth, $tooltip, local_storage,
    commonsDataService, userServiceApi) {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var isAuthenticated = $auth.isAuthenticated();
        if (!isAuthenticated) {
          return;
        }

        var saved_items     = JSON.parse(local_storage.getToken('saved_items'));
        var item_id         = attrs.savedStar;
        var position        = saved_items.indexOf(item_id);

        if (position !== -1) {
          element.removeClass('fa-star-o');
          element.addClass('fa-star');
        }

        element.on('click', function() {
          var hasClass = element.hasClass('fa-star-o');
          if (hasClass) {
            element.removeClass('fa-star-o');
            element.addClass('fa-star');

            /*set the localStorage again for the saved_items*/
            saved_items = JSON.parse(local_storage.getToken('saved_items'));
            local_storage.removeToken('saved_items');
            saved_items.push(item_id);
            saved_items = local_storage.setToken('saved_items', JSON.stringify(saved_items));
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
            /*delete the star items*/
            $q.all([saved_items_delete(item_id)])
              .then(function(response) {
                return response;
              });
          }
        });

        var myTooltip = $tooltip(element, {
          title: 'saved',
          placement: 'bottom',
          container: 'body'
        });

        element.hover(function() {
          if (element.hasClass('fa-star-o')) {
            myTooltip.setEnabled(true);
          } else {
            myTooltip.setEnabled(false);
          }
        }, function() {
          myTooltip.hide();
        });

        function saved_items_data(item_id) {
          commonsDataService
            .httpPOSTQueryParams(
              'saved_items',
              {item_id: item_id},
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
