(function() {
  'use strict';

  module.exports = function(foundUser, req, res, next) {
   if (foundUser) {
      next();
    } else {
      req.isAuthenticated = false;
      var err     = new Error('Unauthorized Routes');
      err.status  = 200;
      return next(err);
    }
  };
}());
