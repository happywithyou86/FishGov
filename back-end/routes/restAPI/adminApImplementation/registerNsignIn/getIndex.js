(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.getUserInfo = function( req, res, next ) {
    if( !req.headers.authorization ) return res.json({data:null});
    var token = req.headers.authorization.split(' ')[1];

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

          res.json( {data:name} );
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
