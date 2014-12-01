
  'use strict';

  var mongo     = require('../../../../configuration/mongodb');

  exports.adminProfile = function( req, res ) {
    mongo.db( 'admin' )
      .collection( 'users' )
      .findOne({_id:req.user._id})
      .then(function( user ) {
        res.json({response: user})
      })
  }
