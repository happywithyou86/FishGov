
  'use strict';

  var mongo    = require('../../../../configuration/mongodb'),
      bcrypt   = require('bcrypt-nodejs'),
      postDb 	 = require( './postIndex.js' ),
      url      = require('url');

  exports.adminUpdateProfile = function( req, res ) {
    var query = url.parse(req.url, true).query;

    if( req.user._id !== query.email ) {
      mongo.db( 'admin' )
        .collection( 'users' )
        .findOne({_id: query.email})
        .then(function( user ) {
          if( user ) {
            res.json( {response: 'Please try another email address or use your existing email address'} )
            return false;
          }
          mongo.db( 'admin' )
            .collection( 'users' )
            .remove({_id: req.user._id})
            .then(function( user ) {
              console.log( 'Remove user: ' + user )
              mongo.db( 'admin' )
                .collection( 'users' )
                .insert({_id: query.email, username: query.username, password: bcrypt.hashSync(query.password, bcrypt.genSaltSync(10))})
                .then(function( user ) {
                  res.json( {response: 'Successfully updated Profile with the new Email Address'} )
                })
            })
        })
    } else {
      mongo.db( 'admin' )
        .collection( 'users' )
        .update({_id: req.user._id},{ username: query.username, password: bcrypt.hashSync(query.password, bcrypt.genSaltSync(10))})
        .then(function( user ) {
          res.json( {response: 'Profile Updated'} )
        })
        .catch(function( message ) {
          console.log( message )
          var error = message.err
          if( message.err.indexOf('_id field cannot be changed') > 0) error = req.flash( 'error', 'Please try another email address or use your existing email address' )
          res.json( {response: req.flash('error')} )
        })
    }
  }
