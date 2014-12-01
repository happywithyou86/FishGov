  'use strict';

  var express   = require('express')
  var router    = express.Router();
  var app       = express();
  var getDb 		= require('../adminPanel/mongoDb/getIndex.js');
  var postDb 	  = require('../adminPanel/mongoDb/postIndex.js');
  var deleteDb 	= require('../adminPanel/mongoDb/deleteIndex.js');

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  })

  app.route( "/dbs" )
      .get( getDb.dbs )
      .post( postDb.dbs )
      .delete( deleteDb.dbs )

  app.route( "/db/:db" )
      .get( getDb.collections )
      .post( postDb.collections )
      .delete( deleteDb.collections )

  app.route( "/db/:db/:collection" )
      .get( getDb.listDocuments )
      .post( postDb.documents )
      .delete( deleteDb.documents )

  app.route( "/db/:db/:collection/:id" )
      .get( getDb.document )
      .post( postDb.doc )

  module.exports = app;
