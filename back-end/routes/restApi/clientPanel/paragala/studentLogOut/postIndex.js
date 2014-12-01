
  'use strict';

  var mongo     = require('../../../../../configuration/mongodb');

  exports.studentLogOut = function( req, res ) {
    mongo.db( 'sessions' )
      .collection( 'sessions' )
      .remove( {_id: req.session.studentUser} )
      .then(function( session ) {
        req.session.studentUser = null;
        res.json({studentIsLogOut: true})
      })
  }
