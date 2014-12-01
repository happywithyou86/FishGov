
  'use strict';

  var mongo = require('../../../../../configuration/mongodb');
  var url   = require('url')
  var querystring = require('querystring')

  exports.questionListAdmin = function( req, res ) {
    mongo.db( 'paragala' )
      .collection( 'questions' )
      .findOne({_id: 'paragalaQuestionnaire'})
      .then(function( questionnaire ) {
        res.json({questions: questionnaire.questions})
      })
   }
