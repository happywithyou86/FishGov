
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.get( '/profile/index.html',  function( req, res ) {
    res.render( 'profile/index.html', res.adminCredentials )
  })

  module.exports = router;
