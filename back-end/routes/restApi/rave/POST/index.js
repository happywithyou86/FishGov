(function() {
  'use strict';

  var path        = require('path'),
      viewsPath   = path.normalize(__dirname + '../../../../config'),
      mongo 	    = require( path.join(viewsPath, 'mongodb') );

  exports.judges = function ( req, res ) {
    var userName = req.body.userName;
    mongo('rave', function ( db ) {
      db.open( function( err, db) {
        if( err ) throw err;
        db.collection( 'judges' ).insert( {_id: userName}, judges )
      })
    })

    function judges( err, doc ) {
      req.session.judges = userName;
      res.json( {response: 'added'} )
    }

  }

  exports.judgesVote = function ( req, res ) {
    var userName  = req.session.judges,
        jenica    = req.body.jenica,
        mae_cee   = req.body.mae_cee,
        anna      = req.body.anna,
        len       = req.body.len,
        shan      = req.body.shan,
        belle     = req.body.belle,
        gelene    = req.body.gelene;
    mongo('rave', function (db) {
      db.open(function (err, db) {
        if(err) throw err
        if( jenica !== undefined ) {
          db.collection( 'judges' ).update(
            {_id: userName}, { $set: { jenica: jenica } }, judgesVote )
        } else if( mae_cee !== undefined ) {
          db.collection( 'judges' ).update(
            {_id: userName}, { $set: { mae_cee: mae_cee } }, judgesVote )
        } else if( anna !== undefined ) {
          db.collection( 'judges' ).update(
            {_id: userName}, { $set: { anna: anna } }, judgesVote )
        } else if( len !== undefined ) {
          db.collection( 'judges' ).update(
            {_id: userName}, { $set: { len: len } }, judgesVote )
        } else if( shan !== undefined ) {
          db.collection( 'judges' ).update(
            {_id: userName}, { $set: { shan: shan } }, judgesVote )
        } else if( belle !== undefined ) {
          db.collection( 'judges' ).update(
            {_id: userName}, { $set: { belle: belle } }, judgesVote )
        } else if( gelene !== undefined ) {
          db.collection( 'judges' ).update(
            {_id: userName}, { $set: { gelene: gelene } }, judgesVote )
        }
      })
    })

    function judgesVote( err, doc ) {
      res.json( {response: 'success'} )
    }

  }

  exports.adminVote = function ( req, res ) {
    var userName  = req.session.judges,
        jenica    = req.body.jenica,
        mae_cee   = req.body.mae_cee,
        anna      = req.body.anna,
        len       = req.body.len,
        shan      = req.body.shan,
        belle     = req.body.belle,
        gelene    = req.body.gelene,

        franco    = req.body.franco,
        carlx     = req.body.carlx,
        charlie   = req.body.charlie,
        lawrenz   = req.body.lawrenz,
        chris     = req.body.chris,
        niel      = req.body.niel,
        carlos    = req.body.carlos,
        barts     = req.body.barts;

    mongo('rave', function (db) {
      db.open(function (err, db) {
        if(err) throw err
        if( jenica !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { jenica: jenica } }, judgesVote )
        } else if( mae_cee !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { mae_cee: mae_cee } }, judgesVote )
        } else if( anna !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { anna: anna } }, judgesVote )
        } else if( len !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { len: len } }, judgesVote )
        } else if( shan !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { shan: shan } }, judgesVote )
        } else if( belle !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { belle: belle } }, judgesVote )
        } else if( gelene !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { gelene: gelene } }, judgesVote )
        } else if( franco !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { franco: franco } }, judgesVote )
        } else if( carlx !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { carlx: carlx } }, judgesVote )
        } else if( charlie !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { charlie: charlie } }, judgesVote )
        } else if( lawrenz !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { lawrenz: lawrenz } }, judgesVote )
        } else if( chris !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { chris: chris } }, judgesVote )
        } else if( niel !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { niel: niel } }, judgesVote )
        } else if( carlos !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { carlos: carlos } }, judgesVote )
        } else if( barts !== undefined ) {
          db.collection( 'admin' ).update(
            {_id: 'aljz'}, { $set: { barts: barts } }, judgesVote )
        }
      })
    })

    function judgesVote( err, doc ) {
      res.json( {response: 'success'} )
    }

  }


})()
