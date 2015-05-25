(function() {
  'use strict';

  angular
    .module('app.widgets')
    .directive('savedStar', savedStar);

    savedStar.$inject = ['$q', 'local_storage', 'commonsDataService', 'userServiceApi'];

    /* @ngInject */
    function savedStar($q, local_storage, commonsDataService, userServiceApi) {
      var directive = {
        restrict: 'AEC',
        link: link
      };

      return directive;

      function link(scope, element, attrs) {
        var saved_items = local_storage.getToken('saved_items');
        var item_id     = attrs.saveStar;

        if (saved_items.indexOf(item_id) !== -1) {
          element.removeClass('fa-star-o');
          element.addClass('fa-star');
        }

        element.on('click', function() {
          var hasClass = element.hasClass('fa-star-o');
          if (hasClass) {
            element.removeClass('fa-star-o');
            element.addClass('fa-star');
            /*save the star items*/
            $q.all([saved_items_data(item_id)])
              .then(function(response) {
                return response;
              });
          } else {
            /*delete the star item*/
            element.addClass('fa-star-o');
            element.removeClass('fa-star');
            /*delete the star items*/
            $q.all([saved_items_delete(item_id)])
              .then(function(response) {
                return response;
              });
          }
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
