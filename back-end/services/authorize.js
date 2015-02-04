(function() {
  'use strict';

  module.exports = function(req, res, next) {
   if (req.headers.authorization) {
      req.isAuthenticated = true;
    } else {
      req.isAuthenticated = false;
    }

    next();
  };
}());
