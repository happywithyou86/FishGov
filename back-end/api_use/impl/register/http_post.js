(function() {
  'use strict';

  exports.user = function(req, res, next) {
    io.createSendToken(io, req.user, res);
  };

}());
