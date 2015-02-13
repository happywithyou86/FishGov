(function() {
  'use strict';

  var io = global.io,
      app = global.io.express(),

      POSTFACEBOOKLOGIN  = require('../adminApImplementation/login/postIndex.js'),
      POSTGOOGLELOGIN    = require('../adminApImplementation/login/postIndex.js'),
      POSTUSERLOGIN       = require('../adminApImplementation/login/postIndex.js');

  app.route('/logInUserFacebook')
    .post(POSTFACEBOOKLOGIN.postFacebookLogin);

  app.route('/logInUserGoogle')
    .post(POSTGOOGLELOGIN.postGoogleLogin);

  app.route('/userLogin')
    .post(POSTUSERLOGIN.postUserLogin);

  module.exports = app;
}());
