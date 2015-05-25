(function() {
  'use strict';

  var app             = io.express(),
      login_post      = require('../impl/login/http_post.js'),
      save_items_get  = require('../impl/user/http_get');

  app.route('/login/facebook')
    .post(login_post.facebook);
  app.route('/login/google')
    .post(login_post.google);
  app.route('/login/user')
    .post(login_post.user);

  app.route('/login/linkedin')
    .post(login_post.linkedin, save_items_get.saved_items);

  module.exports = app;
}());
