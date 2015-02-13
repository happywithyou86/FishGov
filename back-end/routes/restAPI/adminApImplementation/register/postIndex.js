(function() {
  'use strict';

  exports.registerUser = function(req, res, next) {
    global.io.createSendToken(global.io, req.user, res);
  };

}());
