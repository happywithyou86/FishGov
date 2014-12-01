
  'use strict';

  var mongo = require('../../../../../configuration/mongodb'),
      url   = require('url');

  exports.questionsUpdate = function ( req, res, next ) {
    var query = url.parse(req.url, true).query
    mongo.db( 'paragala' )
      .collection( 'questions' )
      .findAndModify({
        query: {_id:'paragalaQuestionnaire'},
        update: {$set: {questions: JSON.parse(query.updateQuestions)}}
      })
      .then(function( document ) {
        res.json({response: {questionsUpdate: true}});
      })
  }
