  "use strict";

  var mongo     = require('../../../../configuration/mongodb'),
      ObjectId  = require('mongodb').ObjectID,
      _         = require('underscore')._,
      url       = require('url');

  exports.dbs = function( req, res ) {
    mongo.db('admin')
      .runCommand({ listDatabases: 1 })
      .then(function( database ) {
        var pushCleanDatabase = [];
        _.forEach( database.databases, function( databaseName ) {
            if ( databaseName.name !== 'undefined' )
              pushCleanDatabase.push( {name:databaseName.name, url: 'database/' + databaseName.name} );
          })
        res.json( pushCleanDatabase );
      })
  }

  exports.collections = function( req, res ) {
    var dbName = req.params.db;
    var request = 'database/' + dbName + '/';
    mongo.db( dbName )
      .collectionNames()
      .then(function ( collNames ) {
        var pushCleanDatabaseCollection = [];
        _.forEach( collNames, function( collName ) {
            var cleanName = collName.name.replace( dbName + ".","" );
            if(cleanName != "system.indexes")
              pushCleanDatabaseCollection.push( {name:cleanName, url: request + cleanName} );
          })
        res.json( pushCleanDatabaseCollection )
      })
  }

  exports.listDocuments = function( req, res ) {
    var dbName = req.params.db;
    var dbCollection = req.params.collection;
    var request = 'database/' + dbName + '/' + dbCollection + '/';
    mongo.db( dbName )
      .collection( dbCollection )
      .find({})
      .toArray()
      .then(function( documents ) {
        var pushDocument = [];
        _.forEach( documents, function( document ) {
          pushDocument.push( {name: document._id, url: request + document._id} )
        })
        res.json( pushDocument )
      })
  }

  exports.document = function( req, res ) {
    mongo.db( req.params.db )
      .collection( req.params.collection )
      .findOne( {'_id': req.params.id.toString()} )
      .then(function( document ) {
        res.json( document )
      })
  }
