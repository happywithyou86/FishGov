(function() {
  'use strict';

  exports.findOneAndRemove = function(options) {
    return io[options.name]
      .findOneAndRemove(
        options.find,
        function(err, result) {
          options.res.json({
            message : options.message,
            status  : 200,
            data    : result
          });
        }
      );

  };

}());
