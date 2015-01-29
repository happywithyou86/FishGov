(function() {
  'use strict';

  module.exports = function( req, res, next ){
    req.jories = req.headers.authorization;
    res.removeHeader('X-Powered-By');
    next();
  };
}());
