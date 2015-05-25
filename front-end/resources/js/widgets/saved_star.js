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
        var id          = attrs.saveStar;

        if (saved_items.indexOf(id) !== -1) {
          element.removeClass('fa-star-o');
          element.addClass('fa-star');
        }

        element.on('click', function() {
          var hasClass = element.hasClass('fa-star-o');
          if (hasClass) {
            element.removeClass('fa-star-o');
            element.addClass('fa-star');
            /*save the star items*/
            // $q.all([saved_items_data(id)])
            //   .then(function(response) {
            //     return response;
            //   });
          } else {
            /*delete the star item*/
            element.addClass('fa-star-o');
            element.removeClass('fa-star');
          }
        });

        function saved_items_data(id) {
          commonsDataService
            .httpPOSTQueryParams(
              'saved_items',
              {id: id},
              userServiceApi
            ).then(function(response) {
              return response;
            });
        }
      }
    }
}());
