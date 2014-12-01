
  'use strict';

  var express = require('express'),
      router  = express.Router();

  router.use(function timeLog( req, res, next) {
   console.log( 'Time: MAIN ', Date.now() );
   next();
  })

  router.get( '/primary/index.html',  function( req, res ) {
  res.render( 'primary/index.html' )
  })

  module.exports = router;
