(function() {
  'use strict';

  var io = global.io,
      app = global.io.express(),

      POSTFACEBOOKLOGIN  = require('../adminApImplementation/registerNsignIn/postIndex.js'),
      POSTGOOGLELOGIN    = require('../adminApImplementation/registerNsignIn/postIndex.js'),
      GETUSERINFO         = require('../adminApImplementation/registerNsignIn/getIndex.js'),
      POSTUSERLOGIN       = require('../adminApImplementation/registerNsignIn/postIndex.js');

  app.route('/logInUserFacebook')
    .post(POSTFACEBOOKLOGIN.postFacebookLogin);

  app.route('/logInUserGoogle')
    .post(POSTGOOGLELOGIN.postGoogleLogin);

  app.route('/userInfo')
    .get(io.authorize, io.xPoweredBy, GETUSERINFO.getUserInfo);

  app.route('/userLogin')
    .post(POSTUSERLOGIN.postUserLogin);

  module.exports = app;
}());
