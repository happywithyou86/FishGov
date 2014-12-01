
  'use strict';

  var express = require('express')
  var router  = express.Router();

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: MAIN ', Date.now() );
   next();
  })

  router.get( '/primary/index.html', function( req, res ) {
    res.render( 'primary/index.html', res.adminCredentials )
  })
  //
  // function redirectToDashBoard( req, res, next ) {
  //   if( !req.cookies.auth_token ) return next();
  //   res.redirect('/dashboard/index.html');
  // }

  module.exports = router;
