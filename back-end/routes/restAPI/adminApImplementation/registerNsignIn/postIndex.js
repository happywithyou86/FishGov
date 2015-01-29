(function() {
  'use strict';

  var node = app_require( 'services/module.config' );

  exports.registerUser = function( req, res, next ) {
    node.createSendToken( node, req.user, res );
  };

  exports.postUserLogin = function( req, res, next ) {
    node.passport.authenticate('local-login', function(err, user) {
      if( err ) next( err );

      req.login( user, function( err ) {
        if( err ) return next( err );
        node.createSendToken( node, user, res );
      });
    })(req, res, next );
  };

  exports.postGoogleLogin = function( req, res, next ) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      code: req.body.code,
      grant_type: 'authorization_code',
      client_secret: node.config.GOOGLE_SECRET,
    };

    node.googleAuth( node, params, res );
  };

  exports.postFacebookLogin = function( req, res, next ) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: node.config.FACEBOOK_SECRET,
      code: req.body.code
    };

    node.facebookAuth( node, params, res );
  };

  /*mike*/
  exports.postUserRegistration = function( req, res, next ) {
    console.log( req.body );
    res.json('MIKE LOVEs GLAI');
  };
}());
