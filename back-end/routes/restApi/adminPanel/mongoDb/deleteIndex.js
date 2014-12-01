  "use strict";

  var mongo = require('../../../../configuration/mongodb')
  var _     = require('underscore')._

  exports.dbs = function(req,res){
    if(!req.query.name) throw {error : "Need a db to delete"}
    mongo.db( req.query.name )
      .dropDatabase()
      .then(function( dbName ) {
        res.json( dbName )
      })
  }

  exports.collections = function(req,res) {
    mongo.db( req.params.db )
      .dropCollection( req.query.name )
      .then(function( collection ) {
        res.json({response: 'success'})
      })
  }

  exports.documents = function (req, res) {
    var dbName = req.params.db;
    var collName = req.params.collection;
    var documentName = req.query.name;

    mongo.db( req.params.db )
      .collection( req.params.collection )
      .remove( {_id: documentName} )
      .then(function( document ) {
        res.json({response: 'success'})
      })
  }
