
  'use strict';

  var passport  = require('passport');
  var mongo     = require('../../../../configuration/mongodb');
  var bcrypt    = require('bcrypt-nodejs');

  exports.adminLogin = function ( req, res, next ) {
    passport.authenticate('local-login', function (err, user, info) {
      var error = req.flash('loginMessage');
      if (err) { return next(err); }
      if(user) {
        return req.logIn(user, function(err) {
          return res.json( {response: 'success'} )
        });
      }
      if (!user) {
        return res.json( {  valid: error.toString() } );
      } else {
        return res.json( { valid: error.toString() } )
      }
    })(req, res, next);
  }

  exports.adminLogout = function( req, res ) {
    req.logout();
    res.json({response: 'success'})
  }

  exports.createAdminAccount = function( req, res ) {
    mongo.db( 'admin' )
      .collection( 'users' )
      .insert( {_id: req.body.email, username: req.body.username, password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))} )
      .then( function( document ) {
        res.json({response: 'success'})
      })
      .catch(function( message ) {
        var error = message.err
        if( message.err.indexOf( 'dup key' )> 0 ) var error = 'Try another email Address'
        res.json({response: error})
      })
  }
