(function() {
  'use strict';

  var node = appRequire('services/module.config'),
      app  = node.express(),

  POSTREGISTERUSER   = require('../adminApImplementation/registerNsignIn/postIndex.js'),
  GETUSERINFO        = require('../adminApImplementation/registerNsignIn/getIndex.js'),
  GETEMAILINFO       = require('../adminApImplementation/registerNsignIn/getIndex.js'),
  POSTUSERLOGIN      = require('../adminApImplementation/registerNsignIn/postIndex.js'),
  POST_FACEBOOKLOGIN  = require('../adminApImplementation/registerNsignIn/postIndex.js'),
  POST_GOOGLELOGIN    = require('../adminApImplementation/registerNsignIn/postIndex.js');

    app.route('/userRegister')
      .post(node.passport.authenticate('local-register'), POSTREGISTERUSER.registerUser);

    app.route('/logInUserFacebook')
      .post(POST_FACEBOOKLOGIN.postFacebookLogin);

    app.route('/logInUserGoogle')
      .post(POST_GOOGLELOGIN.postGoogleLogin);

    app.route('/userInfo')
      .get(node.authorize, node.xPoweredBy, GETUSERINFO.getUserInfo);

    app.route('/userLogin')
      .post(POSTUSERLOGIN.postUserLogin);

    app.route('/isEmailTaken')
      .get(GETEMAILINFO.getEmail);

  module.exports = app;

}());
