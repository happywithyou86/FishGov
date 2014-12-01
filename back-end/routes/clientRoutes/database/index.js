
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.use(function timeLog( req, res, next ) {
    console.log( 'Time: Database ', Date.now() );
    next();
  })

  router.get( '/database/index.html', function( req, res ) {
    res.render( 'database/index.html', res.adminCredentials )
  })

  module.exports = router;
