
  'use strict';

  var mongo = require('../../../../../configuration/mongodb');
  var url   = require('url')
  var querystring = require('querystring')

  exports.questionListClient = function( req, res ) {
    console.log( 'URL: ' +  req.url )
    var query   = url.parse(req.url, true).query;
    var nextUrl = 'paragala/questions?category=entertainment programs&sub=2';
    var previousUrl = 'paragala/questions';


    mongo.db( 'paragala' )
      .collection( 'questions' )
      .findOne({_id: 'paragalaQuestionnaire'})
      .then(function( questionnaire ) {
        var spliceCategory        = null;
        var spliceSubItem         = null;
        var spliceSubItemLength   = null;
        var querySubTemp          = null;
        var questionnaireLength   = null;
        var questionnaireQuestions = null;
        var queries = querystring.parse(query.param);

        for( var i = 0; i < questionnaire.questions.length; i++) {
          questionnaireQuestions = questionnaire.questions;
          questionnaireLength = questionnaire.questions[i].items.length % 2 == 0?
                                questionnaire.questions[i].items.length:
                                questionnaire.questions[i].items.length + 1;

          if(questionnaire.questions[i].title == queries.category.toUpperCase() ) {
            queries.category = questionnaire.questions[i].title.toLowerCase();

            if( 0 == i ) {
              spliceCategory = i + 1;
              if( (parseInt(queries.sub)) == 2 ) {
                previousUrl = 'paragala/questions?category=' + queries.category.toLowerCase() +
                              '&sub=2';
                nextUrl     = 'paragala/questions?category=' + queries.category.toLowerCase() +
                              '&sub=4'
                //check if the queries.sub is only 2 change it to the nextUrl
                if( (parseInt(queries.sub)) ==  questionnaireLength )
                  nextUrl     = 'paragala/questions?category=' + questionnaire.questions[i+1].title.toLowerCase() +
                                '&sub=2'
                spliceSubItem       = 2;
                spliceSubItemLength = questionnaire.questions[i].items.length - 1
                // morethan 2 questions
              } else {
                previousUrl = 'paragala/questions?category=' + queries.category.toLowerCase() +
                              '&sub=' + (parseInt(queries.sub) - 2);
                nextUrl     = 'paragala/questions?category=' + queries.category.toLowerCase() +
                              '&sub=' + (parseInt(queries.sub) + 2);
                // if not change the nextUrl to the next Category
                // update this condition if the length of the category is only 1
                if( questionnaireLength == parseInt(queries.sub) ) {
                  nextUrl     = 'paragala/questions?category=' + questionnaire.questions[i+1].title.toLowerCase() +
                                '&sub=2'
                }
                spliceSubItem       = 0;
                spliceSubItemLength = parseInt(queries.sub)
                //questionnaire.questions.splice( spliceCategory , questionnaire.questions.length - 1 )
                questionnaire.questions[0].items.splice( spliceSubItem, spliceSubItemLength - 2 )
                spliceSubItem       = 2;
                spliceSubItemLength = questionnaire.questions[i].items.length - 1
                //questionnaire.questions[0].items.splice( 2, questionnaire.questions[i].items.length - 1 )
                console.log( 'JoRIEs' )
              }
              //get the next category i > 0
            } else {
              // //get the original lenght of the items in this category
              // spliceSubItemLength = questionnaire.questions[i].items.length - 1;
              //
              // spliceCategory      = 0;
              // questionnaire.questions.splice( spliceCategory , i )
              // spliceCategory      = i ;
              //questionnaire.questions.splice( i , questionnaire.questions.length - 1 )
              if( (parseInt(queries.sub)) == 2 ) {
                previousUrl = 'paragala/questions?category=' + questionnaire.questions[i - 1].title.toLowerCase() + '&sub=' +
                              (questionnaire.questions[i - 1].items.length % 2 == 0?
                              questionnaire.questions[i - 1].items.length: questionnaire.questions[i - 1].items.length + 1);
                nextUrl     = 'paragala/questions?category=' + queries.category.toLowerCase() +
                              '&sub=' + (parseInt(queries.sub) + 2);

                //check if the queries.sub is only 2 change it to the nextUrl
                if( questionnaireLength == (parseInt(queries.sub)) && questionnaire.questions.length !== (i + 1) )
                  nextUrl     = 'paragala/questions?category=' + questionnaire.questions[i+1].title.toLowerCase() +
                                '&sub=2'
                else
                  nextUrl     = 'paragala/questions?category=' + questionnaire.questions[i].title.toLowerCase() +
                                '&sub=' + (questionnaireLength == (parseInt(queries.sub)) ?
                                (parseInt(queries.sub)): (parseInt(queries.sub) + 2))
                console.log( 'Value of i: ' + i )
                //get the original length of the items in this category
                spliceSubItemLength = questionnaire.questions[i].items.length - 1;
                //splice the category on the first
                spliceCategory      = 0;
                questionnaire.questions.splice( spliceCategory , i )

                spliceCategory      = i;
                spliceSubItem       = 2;
              } else {
                previousUrl = 'paragala/questions?category=' + queries.category.toLowerCase() +
                              '&sub=' + (parseInt(queries.sub) - 2);
                nextUrl     = 'paragala/questions?category=' + queries.category.toLowerCase() +
                              '&sub=' + (parseInt(queries.sub) + 2);
                if( questionnaireLength == parseInt(queries.sub) && questionnaireQuestions.length !== (i + 1) ) {
                  nextUrl     = 'paragala/questions?category=' + questionnaire.questions[i+1].title.toLowerCase() +
                                '&sub=2'
                } else {
                  nextUrl     = 'paragala/questions?category=' + questionnaire.questions[i].title.toLowerCase() +
                                '&sub=' + (questionnaireLength == (parseInt(queries.sub)) ?
                                (parseInt(queries.sub)): (parseInt(queries.sub) + 2))
                }



                //get the original length of the items in this category
                var spliceSubItemLengthTemp = questionnaire.questions[i].items.length - 1;
                //splice the category on the first
                spliceCategory      = 0;
                questionnaire.questions.splice( spliceCategory , i )

                spliceCategory      = i;
                //splice the list of questions in the category in the first
                spliceSubItem       = 0;
                spliceSubItemLength = parseInt(queries.sub)
                questionnaire.questions[0].items.splice( spliceSubItem, spliceSubItemLength - 2 )

                spliceSubItem       = 2;
                spliceSubItemLength = spliceSubItemLengthTemp;
                //spliceSubItemLength = questionnaire.questions[i].items.length - (questionnaire.questions[i].items.length % 2 == 0? 2:1);
              }
            }
          }
        }

        questionnaire.questions.splice( spliceCategory , questionnaire.questions.length - 1)
        questionnaire.questions[0].items.splice( spliceSubItem, spliceSubItemLength )
        res.json({questions: questionnaire.questions, previousUrl: previousUrl, nextUrl: nextUrl})
      })
   }

   exports.studentQuestionList = function( req, res ) {
     mongo.db( 'paragala' )
      .collection( 'students' )
      .findOne({_id: req.session.studentUser})
      .then(function( student ) {
        res.json({questions: student.questions})
      })
   }
