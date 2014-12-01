
  'use strict';

  var passport  = require('passport');
  var uuid      = require('node-uuid');
  var mongo     = require('../../../../../configuration/mongodb');

  exports.studentLogIn = function ( req, res, next ) {
    if(!req.session.studentUser) req.session.studentUser = req.body.studentNumber.toString()
    console.log( 'Req.body: ' + req.body.studentNumber.toString() )
    mongo.db( 'paragala' )
      .collection( 'students' )
      .findOne( {'_id': req.session.studentUser} )
      .then(function( paragalaUser ) {
        console.log( 'ParagalaUser: ' +  req.session.studentUser );
        if( paragalaUser ) {
          mongo.db( 'sessions' )
            .collection( 'sessions' )
            .findOne({_id: req.session.studentUser})
            .then(function( session ) {
              if( session ) {
                res.cookie( 'auth_token', session.token , {httpOnly: true})
                res.json({studentIsAuthenticated: true})
              } else {
                mongo.db( 'sessions' )
                  .collection( 'sessions' )
                  .insert({
                    _id: req.session.studentUser,
                    token: uuid.v4()
                  })
                  .then(function( session ) {
                    res.cookie( 'auth_token', session.token , {httpOnly: true})
                    //res.send(200)
                    res.json({studentIsAuthenticated: true})
                  })
              }
            })

        } else {
          res.json({response: 'No User Found'})
        }
      })
  }
