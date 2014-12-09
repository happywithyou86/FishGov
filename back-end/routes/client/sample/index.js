
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.get('/client/sample/welcome.html', function( req, res ) {
    res.render('client/sample/welcome.html');
  });

  module.exports = router;
