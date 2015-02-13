(function() {
  'use strict';

  var  io = global.io,
      app = global.io.express(),

      GETEMAILINFO       = require('../adminApImplementation/registerNsignIn/getIndex.js'),
      POSTREGISTERUSER   = require('../adminApImplementation/registerNsignIn/postIndex.js');

  app.route('/userRegister')
    .post(io.passport.authenticate('local-register'), POSTREGISTERUSER.registerUser);

  app.route('/isEmailTaken')
    .get(GETEMAILINFO.getEmail);

  module.exports = app;
}());
