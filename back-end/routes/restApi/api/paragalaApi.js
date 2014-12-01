
  'use strict';

  var express               = require('express'),
      app                   = express(),
      getDbQuestionAdmin   = require( '../adminPanel/paragala/questions/getIndex.js' ),
      postDbQuestionAdmin  = require( '../adminPanel/paragala/questions/postIndex.js' ),
      getDbQuestionClient  = require( '../clientPanel/paragala/questions/getIndex.js' ),
      putDbQuestionClient  = require( '../clientPanel/paragala/questions/putIndex.js' ),
      postDbAddStudent 		  = require( '../clientPanel/paragala/addStudent/postIndex.js' ),
      postDbStudentLogIn    = require( '../clientPanel/paragala/studentLogIn/postIndex.js' ),
      postDbStudentLogOut   = require( '../clientPanel/paragala/studentLogOut/postIndex.js' );

      //putDb     = require( '../admin/putIndex.js' );

  // router.use(function timeLog( req, res, next) {
  //   console.log( 'Time: ', Date.now() );
  //   next();
  // })

  app.route( '/paragalaAddStudent' )
    .post( postDbAddStudent.paragalaAddStudent );

  app.route( '/studentLogin' )
    .post( postDbStudentLogIn.studentLogIn );

  app.route( '/studentLogout' )
    .post( postDbStudentLogOut.studentLogOut)

  app.route( '/questionsUpdate' )
    .put( postDbQuestionAdmin.questionsUpdate )

  app.route( '/questionsListAdmin' )
    .get( getDbQuestionAdmin.questionListAdmin )

  app.route( '/questionsListClient' )
    .get( getDbQuestionClient.questionListClient )
    .put( putDbQuestionClient.questionsSubmit )

  app.route( '/studentQuestionList' )
    .get( getDbQuestionClient.studentQuestionList )


  module.exports = app;
