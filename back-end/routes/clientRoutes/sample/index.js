
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.get('/sample/welcome.html', function( req, res ) {
    res.render('sample/welcome.html');
  });

  module.exports = router;
