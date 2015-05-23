(function() {
  'use strict';

  var app   = io.express(),
      login_post = require('../impl/login/http_post.js');

  app.route('/login/facebook')
    .post(login_post.facebook);
  app.route('/login/google')
    .post(login_post.google);
  app.route('/login/user')
    .post(login_post.user);

  app.route('/login/linkedin')
    .post(login_post.linkedin);

  module.exports = app;
}());
