
  'use strict';

  var mongo = require('../../../../../configuration/mongodb');

  exports.paragalaAddStudent = function( req, res ) {
    mongo.db( 'paragala' )
      .collection( 'students' )
      .findOne({_id: req.body.SN.toString()})
      .then(function( user ) {
        console.log( 'first User: ' + user )
        if( user ) {
          res.json({response: {alreadyRegistered:true}})
        } else {
          console.log( 'else' )
          mongo.db( 'paragala' )
            .collection( 'students' )
            .insert({_id: req.body.SN.toString(), vote: 'false'})
            .then(function( user ) {
              res.json({response: {alreadyRegistered:false}})
            })
        }
      })
  }
