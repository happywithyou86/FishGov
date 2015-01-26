(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getUserInfo = function( req, res, next ) {
    var token = req.query.token;
    if( !token ) return res.json( 'Unauthorized: Please Login to View the Page' );

      try {
        var payLoad = node.jwt.decode( token, 'shhh..' );
      }catch( e ) {
        return res.json( 'Unauthorized: TOKEN ERROR' );
      }

      node.mongoDB( node, 'pageant' )
      .then(function() {
        node.User
        .findById( payLoad.sub, function( err, document ) {
          var name = document.displayName || document.username;

          res.json( name );
        });
      });
  };

  exports.getEmail = function( req, res, next ) {
    var query = node.url.parse( req.url, true ).query;
    node.mongoDB( node, 'pageant' )
    .then(function( connection ) {
      node.User.findOne({email: query.email}, function( err, user ) {
        if( err ) throw err;
        if( user ) return res.status(201).send( user );
        res.status(200).send( user );
      });
    });
  };
}());
