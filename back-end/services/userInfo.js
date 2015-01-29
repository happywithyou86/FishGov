(function() {
  'use strict';


  module.exports = function( req, res, next ) {
    var node = app_require( 'services/module.config' );
    if( req.headers.authorization ){
      var token = req.headers.authorization.split(' ')[1];
      var payLoad = node.jwt.decode( token, 'shhh..' );
      node.mongoDB( node, 'pageant' )
      .then(function() {
        node.User
        .findById( payLoad.sub, function( err, document ) {
          var name = document.displayName || document.username;
          req.userName = name;
          res.locals.user = name;
          next();
        });
      });
    } else {
      next();
    }
  };
}());
