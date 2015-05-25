(function() {
  'use strict';

  exports._ = function(options) {
    var document = io[options.name](options.details);
      document.save(function() {
        options.res.json({
          message: 'Invoice Registration',
          status: 200,
          data: document
        });
      });
  };
}());
