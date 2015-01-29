(function() {
  'use strict';

  var node = app_require( 'services/module.config' ),
      app  = node.express(),

  POST_RegisterUser   = require( '../adminApImplementation/registerNsignIn/postIndex.js' ),
  GET_UserInfo        = require( '../adminApImplementation/registerNsignIn/getIndex.js' ),
  GET_EmailInfo       = require( '../adminApImplementation/registerNsignIn/getIndex.js' ),
  POST_UserLogin      = require( '../adminApImplementation/registerNsignIn/postIndex.js' ),
  POST_FacebookLogin  = require( '../adminApImplementation/registerNsignIn/postIndex.js' ),
  POST_GoogleLogin    = require( '../adminApImplementation/registerNsignIn/postIndex.js' );

  var POST_UserRegistration = require( '../adminApImplementation/registerNsignIn/postIndex.js' );

    app.route( '/userApi/userRegister' )
      .post( node.passport.authenticate('local-register'), POST_RegisterUser.registerUser );

    app.route( '/userApi/logInUserFacebook' )
      .post( POST_FacebookLogin.postFacebookLogin );

    app.route( '/userApi/logInUserGoogle' )
      .post( POST_GoogleLogin.postGoogleLogin );

    app.route( '/userApi/userInfo' )
      .get( node.authorize, node.xPoweredBy, GET_UserInfo.getUserInfo );

    app.route( '/userApi/userLogin' )
      .post( POST_UserLogin.postUserLogin );

    app.route( '/userApi/isEmailTaken' )
      .get( GET_EmailInfo.getEmail );

    /*mike api*/
    app.route( '/api/registration' )
      .post( POST_UserRegistration.postUserRegistration );

  module.exports = app;

}());
