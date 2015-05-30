(function() {
  'use strict';

  angular
    .module('app.widgets')
    .filter('newLines', newLines);

    function newLines() {

      var filter = function(text) {
        return text.replace(/\n/g, '<br/>');
      };
      return filter;
    }

}());
