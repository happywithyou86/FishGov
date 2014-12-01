
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.use(function timeLog( req, res, next ) {
    console.log( 'Time: Database ', Date.now() );
    next();
  })

  router.get( '/dashboard/index.html',  function( req, res) {
    res.render( 'dashboard/index.html', res.adminCredentials )
  })

  module.exports = router;
