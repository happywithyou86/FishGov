(function() {
  'use strict';

  var io = global.io,
      app = global.io.express(),
      GETUSERINFO         = require('../adminApImplementation/user/getIndex.js');

  app.route('/userInfo')
    .get(io.authorize, io.xPoweredBy, GETUSERINFO.getUserInfo);

  module.exports = app;
}());
