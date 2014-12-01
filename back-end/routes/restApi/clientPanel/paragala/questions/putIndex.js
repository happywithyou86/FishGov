
  'use strict';

  var mongo = require('../../../../../configuration/mongodb'),
      url   = require('url');

  exports.questionsSubmit = function( req, res ) {
    var query = url.parse(req.url, true).query;
    console.log( query.questions )

    mongo.db( 'paragala' )
      .collection( 'students' )
      .update({_id: req.session.studentUser}, {isVoted: false, questions: JSON.parse(query.questions)})
      .then(function( student ) {
        res.json({status: 'student has been updated'})
      })
  }
