(function() {
  'use strict';

  exports._ = function(options) {
    var document = io[options.name](options.details);
      document.save(function() {
        options.res.json({
          message : options.message,
          status  : 200,
          data    : document
        });
      });
  };

  exports.login_dates = function(options) {
    var document = io[options.name](options.details);
      document.save(function() {
        return;
      });
  };
}());
