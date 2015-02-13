(function() {
  'use strict';

  module.exports = function(error, value) {
    if (error) {
      console.error(error);
      return;
    } else {
      console.info(value);
    }
  };
}());
