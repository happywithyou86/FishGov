(function() {
  'use strict';

  var path        = require('path'),
      _           = require('underscore')._,
      viewsPath   = path.normalize(__dirname + '../../../../config'),
      mongo 	    = require( path.join(viewsPath, 'mongodb') );

  exports.judges = function ( req, res ) {
    console.log( 'jories' )
    res.send('OK')
  }

  exports.judgesVote = function ( req, res ) {
    var userName = req.session.judges;
    mongo('rave', function( db ) {
      db.open(function ( err, db ) {
        if( err ) throw err;
        db.collection( 'judges' ).find().toArray( judgesVote )
      })
    })

    function judgesVote( err, doc ) {
      var out               = [];
      var counter           = 0;
      var jenicaThemeWear   = 0;
      var jenicaCasualWear  = 0;
      var jenicaLongGown    = 0;
      var jenicaBeautyPoise = 0;

      var maeCeeThemeWear   = 0;
      var maeCeeCasualWear  = 0;
      var maeCeeLongGown    = 0;
      var maeCeeBeautyPoise = 0;

      var annaThemeWear     = 0;
      var annaCasualWear    = 0;
      var annaLongGown      = 0;
      var annaBeautyPoise   = 0;

      var lenThemeWear      = 0;
      var lenCasualWear     = 0;
      var lenLongGown       = 0;
      var lenBeautyPoise    = 0;

      var shanThemeWear     = 0;
      var shanCasualWear    = 0;
      var shanLongGown      = 0;
      var shanBeautyPoise   = 0;

      var belleThemeWear    = 0;
      var belleCasualWear   = 0;
      var belleLongGown     = 0;
      var belleBeautyPoise  = 0;

      var geleneThemeWear   = 0;
      var geleneCasualWear  = 0;
      var geleneLongGown    = 0;
      var geleneBeautyPoise = 0;

      var francoThemeWear   = 0;
      var francoCasualWear  = 0;
      var francoLongGown    = 0;
      var francoBeautyPoise = 0;

      var carlxThemeWear    = 0;
      var carlxCasualWear   = 0;
      var carlxLongGown     = 0;
      var carlxBeautyPoise  = 0;

      var charlieThemeWear    = 0;
      var charlieCasualWear   = 0;
      var charlieLongGown     = 0;
      var charlieBeautyPoise  = 0;

      var lawrenzThemeWear    = 0;
      var lawrenzCasualWear   = 0;
      var lawrenzLongGown     = 0;
      var lawrenzBeautyPoise  = 0;

      var chrisThemeWear      = 0;
      var chrisCasualWear     = 0;
      var chrisLongGown       = 0;
      var chrisBeautyPoise    = 0;

      var nielThemeWear       = 0;
      var nielCasualWear      = 0;
      var nielLongGown        = 0;
      var nielBeautyPoise     = 0;

      var carlosThemeWear     = 0;
      var carlosCasualWear    = 0;
      var carlosLongGown      = 0;
      var carlosBeautyPoise   = 0;

      var bartsThemeWear      = 0;
      var bartsCasualWear     = 0;
      var bartsLongGown       = 0;
      var bartsBeautyPoise    = 0;


      _.each( doc, function ( item ) {
        console.log( item )
        try {
          counter += 1;
          jenicaThemeWear   += item.jenica.themeWear;
          jenicaCasualWear  += item.jenica.casualWear;
          jenicaLongGown    += item.jenica.longGown;
          jenicaBeautyPoise += item.jenica.beautyPoise;

          maeCeeThemeWear   += item.mae_cee.themeWear;
          maeCeeCasualWear  += item.mae_cee.casualWear;
          maeCeeLongGown    += item.mae_cee.longGown;
          maeCeeBeautyPoise += item.mae_cee.beautyPoise;

          annaThemeWear     += item.anna.themeWear;
          annaCasualWear    += item.anna.casualWear;
          annaLongGown      += item.anna.longGown;
          annaBeautyPoise   += item.anna.beautyPoise;

          lenThemeWear      += item.len.themeWear;
          lenCasualWear     += item.len.casualWear;
          lenLongGown       += item.len.longGown;
          lenBeautyPoise    += item.len.beautyPoise;

          shanThemeWear     += item.shan.themeWear;
          shanCasualWear    += item.shan.casualWear;
          shanLongGown      += item.shan.longGown;
          shanBeautyPoise   += item.shan.beautyPoise;

          belleThemeWear    += item.belle.themeWear;
          belleCasualWear   += item.belle.casualWear;
          belleLongGown     += item.belle.longGown;
          belleBeautyPoise  += item.belle.beautyPoise;

          geleneThemeWear   += item.gelene.themeWear;
          geleneCasualWear  += item.gelene.casualWear;
          geleneLongGown    += item.gelene.longGown;
          geleneBeautyPoise += item.gelene.beautyPoise;

          francoThemeWear     += item.franco.themeWear;
          francoCasualWear    += item.franco.casualWear;
          francoLongGown      += item.franco.longGown;
          francoBeautyPoise   += item.franco.beautyPoise;

          carlxThemeWear      += item.carlx.themeWear;
          carlxCasualWear     += item.carlx.casualWear;
          carlxLongGown       += item.carlx.longGown;
          carlxBeautyPoise    += item.carlx.beautyPoise;

          charlieThemeWear    += item.charlie.themeWear;
          charlieCasualWear   += item.charlie.casualWear;
          charlieLongGown     += item.charlie.longGown;
          charlieBeautyPoise  += item.charlie.beautyPoise;

          lawrenzThemeWear    += item.lawrenz.themeWear;
          lawrenzCasualWear   += item.lawrenz.casualWear;
          lawrenzLongGown     += item.lawrenz.longGown;
          lawrenzBeautyPoise  += item.lawrenz.beautyPoise;

          chrisThemeWear      += item.chris.themeWear;
          chrisCasualWear     += item.chris.casualWear;
          chrisLongGown       += item.chris.longGown;
          chrisBeautyPoise    += item.chris.beautyPoise;

          nielThemeWear       += item.niel.themeWear;
          nielCasualWear      += item.niel.casualWear;
          nielLongGown        += item.niel.longGown;
          nielBeautyPoise     += item.niel.beautyPoise;

          carlosThemeWear     += item.carlos.themeWear;
          carlosCasualWear    += item.carlos.casualWear;
          carlosLongGown      += item.carlos.longGown;
          carlosBeautyPoise   += item.carlos.beautyPoise;

          bartsThemeWear      += item.barts.themeWear;
          bartsCasualWear     += item.barts.casualWear;
          bartsLongGown       += item.barts.longGown;
          bartsBeautyPoise    += item.barts.beautyPoise;

        } catch(err) {

        }

      })

      jenicaThemeWear   = jenicaThemeWear/counter;
      jenicaCasualWear  = jenicaCasualWear/counter;
      jenicaLongGown    = jenicaLongGown/counter;
      jenicaBeautyPoise = jenicaBeautyPoise/counter;

      maeCeeThemeWear   = maeCeeThemeWear/counter;
      maeCeeCasualWear  = maeCeeCasualWear/counter;
      maeCeeLongGown    = maeCeeLongGown/counter;
      maeCeeBeautyPoise = maeCeeBeautyPoise/counter;

      annaThemeWear     = annaThemeWear/counter;
      annaCasualWear    = annaThemeWear/counter;
      annaLongGown      = annaThemeWear/counter;
      annaBeautyPoise   = annaThemeWear/counter;

      lenThemeWear      = lenThemeWear/counter;
      lenCasualWear     = lenThemeWear/counter;
      lenLongGown       = lenThemeWear/counter;
      lenBeautyPoise    = lenThemeWear/counter;

      shanThemeWear     = shanThemeWear/counter;
      shanCasualWear    = shanThemeWear/counter;
      shanLongGown      = shanThemeWear/counter;
      shanBeautyPoise   = shanThemeWear/counter;

      belleThemeWear    = belleThemeWear/counter;
      belleCasualWear   = belleThemeWear/counter;
      belleLongGown     = belleThemeWear/counter;
      belleBeautyPoise  = belleThemeWear/counter;

      geleneThemeWear   = geleneThemeWear/counter;
      geleneCasualWear  = geleneThemeWear/counter;
      geleneLongGown    = geleneThemeWear/counter;
      geleneBeautyPoise = geleneThemeWear/counter;

      francoThemeWear     = francoThemeWear/counter;
      francoCasualWear    = francoThemeWear/counter;
      francoLongGown      = francoThemeWear/counter;
      francoBeautyPoise   = francoThemeWear/counter;

      carlxThemeWear      = carlxThemeWear/counter;
      carlxCasualWear     = carlxThemeWear/counter;
      carlxLongGown       = carlxThemeWear/counter;
      carlxBeautyPoise    = carlxThemeWear/counter;

      charlieThemeWear    = charlieThemeWear/counter;
      charlieCasualWear   = charlieThemeWear/counter;
      charlieLongGown     = charlieThemeWear/counter;
      charlieBeautyPoise  = charlieThemeWear/counter;

      lawrenzThemeWear    = lawrenzThemeWear/counter;
      lawrenzCasualWear   = lawrenzThemeWear/counter;
      lawrenzLongGown     = lawrenzThemeWear/counter;
      lawrenzBeautyPoise  = lawrenzThemeWear/counter;

      chrisThemeWear      = chrisThemeWear/counter;
      chrisCasualWear     = chrisThemeWear/counter;
      chrisLongGown       = chrisThemeWear/counter;
      chrisBeautyPoise    = chrisThemeWear/counter;

      nielThemeWear       = nielThemeWear/counter;
      nielCasualWear      = nielThemeWear/counter;
      nielLongGown        = nielThemeWear/counter;
      nielBeautyPoise     = nielThemeWear/counter;

      carlosThemeWear     = carlosThemeWear/counter;
      carlosCasualWear    = carlosThemeWear/counter;
      carlosLongGown      = carlosThemeWear/counter;
      carlosBeautyPoise   = carlosThemeWear/counter;

      bartsThemeWear      = bartsThemeWear/counter;
      bartsCasualWear     = bartsThemeWear/counter;
      bartsLongGown       = bartsThemeWear/counter;
      bartsBeautyPoise    = bartsThemeWear/counter;

      var data = {
        jenica: {
          themeWear   : jenicaThemeWear,
          casualWear  : jenicaCasualWear,
          longGown    : jenicaLongGown,
          beautyPoise : jenicaBeautyPoise
        },
        mae_cee: {
          themeWear   : maeCeeThemeWear,
          casualWear  : maeCeeCasualWear,
          longGown    : maeCeeLongGown,
          beautyPoise : maeCeeBeautyPoise
        },
        anna: {
          themeWear   : annaThemeWear,
          casualWear  : annaCasualWear,
          longGown    : annaLongGown,
          beautyPoise : annaBeautyPoise
        },
        len: {
          themeWear   : lenThemeWear,
          casualWear  : lenCasualWear,
          longGown    : lenLongGown,
          beautyPoise : lenBeautyPoise
        },
        shan: {
          themeWear   : shanThemeWear,
          casualWear  : shanCasualWear,
          longGown    : shanLongGown,
          beautyPoise : shanBeautyPoise
        },
        belle: {
          themeWear   : belleThemeWear,
          casualWear  : belleCasualWear,
          longGown    : belleLongGown,
          beautyPoise : belleBeautyPoise
        },
        gelene: {
          themeWear   : geleneThemeWear,
          casualWear  : geleneCasualWear,
          longGown    : geleneLongGown,
          beautyPoise : geleneBeautyPoise
        },
        franco: {
          themeWear   : francoThemeWear,
          casualWear  : francoCasualWear,
          longGown    : francoLongGown,
          beautyPoise : francoBeautyPoise
        },
        carlx: {
          themeWear   : carlxThemeWear,
          casualWear  : carlxCasualWear,
          longGown    : carlxLongGown,
          beautyPoise : carlxBeautyPoise
        },
        charlie: {
          themeWear   : charlieThemeWear,
          casualWear  : charlieCasualWear,
          longGown    : charlieLongGown,
          beautyPoise : charlieBeautyPoise
        },
        lawrenz: {
          themeWear   : lawrenzThemeWear,
          casualWear  : lawrenzCasualWear,
          longGown    : lawrenzLongGown,
          beautyPoise : lawrenzBeautyPoise
        },
        chris: {
          themeWear   : chrisThemeWear,
          casualWear  : chrisCasualWear,
          longGown    : chrisLongGown,
          beautyPoise : chrisBeautyPoise
        },
        niel: {
          themeWear   : nielThemeWear,
          casualWear  : nielCasualWear,
          longGown    : nielLongGown,
          beautyPoise : nielBeautyPoise
        },
        carlos: {
          themeWear   : carlosThemeWear,
          casualWear  : carlosCasualWear,
          longGown    : carlosLongGown,
          beautyPoise : carlosBeautyPoise
        },
        barts: {
          themeWear   : bartsThemeWear,
          casualWear  : bartsCasualWear,
          longGown    : bartsLongGown,
          beautyPoise : bartsBeautyPoise
        }
      }
      res.json( {response: data} )
    }
  }

  exports.judgesVoteResult = function ( req, res ) {
    mongo('rave', function( db ) {
      db.open(function ( err, db ) {
        if( err ) throw err;
        db.collection( 'admin' ).findOne({_id: 'aljz' }, judgesVoteResult )
      })
    })

    function judgesVoteResult( err, doc ) {
      res.json( {response: doc} )
    }
  }

  exports.finalResult = function ( req, res ) {
    mongo('rave', function( db ) {
      db.open(function ( err, db ) {
        if( err ) throw err;
        db.collection( 'admin' ).findOne({_id: 'aljz' }, judgesVoteResult )
      })
    })

    function judgesVoteResult( err, doc ) {
      res.json( {response: doc} )
    }
  }

})()
