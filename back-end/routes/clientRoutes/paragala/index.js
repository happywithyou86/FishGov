
  'use strict';

  var express = require('express')
  var router  = express.Router();
  var cookieParser = require('cookie').parse;

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  router.get( '/paragala/index.html', function( req, res ) {
    res.render( 'paragala/index.html', {studentUser:req.session.studentUser } )
  })

  router.get( '/paragala/addStudent/index.html', function( req, res ) {
    res.render( 'paragala/addStudent/index.html', res.adminCredentials )
  })

  router.get( '/paragala/questions/index.html', function(req, res ) {
    res.render( 'paragala/questions/index.html' )
  })

  router.get( '/paragala/startVoting/index.html', function(req, res ) {
    res.render( 'paragala/startVoting/index.html' )
  })


  function studentIsAuthenticated( req, res, next ) {
    console.log( 'jories' )
    if( !req.session.studentUser ) return next();
    //res.send({redirect: '/dashboard/index.html'})
    req.method = 'get';
    res.redirect('/paragala/questions/index.html')
  }

  module.exports = router;
