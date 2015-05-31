(function() {
  'use strict';

  angular
    .module('app.widgets')
    .filter('newLines', newLines);

    function newLines() {

      var filter = function(text) {
        return text && text.replace(/\n/g, '<br/>') ? text.replace(/\n/g, '<br/>') : text;
      };
      return filter;
    }

}());
