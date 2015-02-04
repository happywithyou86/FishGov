(function() {
  'use strict';

  var express = require('express'),
  router  = express.Router();

  router.get('/client/sample/index.html', function(req, res) {
    res.render('client/sample/index.html');
  });

  module.exports = router;
}());
