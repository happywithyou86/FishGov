(function() {
  'use strict';

  exports.login_dates = function(options) {
    var document = io[options.name](options.details);
      document.save(function() {
        return;
      });
  };
}());
