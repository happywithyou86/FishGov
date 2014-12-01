
  'use strict';

  var index   = require('../controllers');
  var express = require('express')
  var util    = require('util')

  //intialize all the requirement paths GET POST DELETE PUT
  var GET 		= require('../controllers/GET');
  var DELETE 	= require('../controllers/DELETE');
  var POST 		= require('../controllers/POST');
  var app     = express();
  var router  = express.Router();
  var paragalaStudentGET = require('../controllers/paragala/GET')
  var paragalaStudentPOST = require('../controllers/paragala/POST')
  var path = require('path')
  var viewsPath   = path.normalize(__dirname + '/../app');

  /*
   * Rave Api
   **/
   var ravePOST = require('../controllers/rave/POST')
   var raveGET  = require('../controllers/rave/GET')

  /**
   * Application routes
   */
  module.exports = function(app, passport) {

    //enable cors
    app.all('/*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        next();
    });

  /**
   * Router
   */
  var router = express.Router();

    // list all Databases
    app.route("/mongo-api/dbs")
        .get(GET.dbs)
        .post(POST.db)
        .delete(DELETE.db)

    app.route("/mongo-api/db/:collection")
        .get( GET.collections )
        .post( POST.collections )
        .delete( DELETE.collections )

    app.route( "/mongo-api/db/:db/:collection" )
        .get( GET.listDocuments )
        .post( POST.documents )
        .delete( DELETE.documents )

    app.route( "/mongo-api/db/:db/:collection/:id" )
        .get( GET.document )
        .post( POST.doc )

    app.route( '/rave-api/login-judges' )
      .get( raveGET.judges )
      .post( ravePOST.judges )

    app.route( '/rave-api/judges-vote' )
      .get( raveGET.judgesVote )
      .post( ravePOST.judgesVote )

    app.route( '/rave-api/admin-vote' )
      .get( raveGET.judgesVoteResult )
      .post( ravePOST.adminVote )

    app.route( '/rave-api/final-result' )
      .get( raveGET.finalResult )


    app.get( '/isAdminLogin/admin', function ( req, res, next ) {
      res.send({ isAdminLogin: req.session.isAdminLogin })
    })

    app.get( '/isStudentLogin/student', function ( req, res, next ) {
      res.send( { isStudentLogin: req.session.isLogin } )
    })

    app.post( "/paragala-api/users", function (req, res, next) {
      passport.authenticate('local-login', function (err, user, info) {
        var error = req.flash('loginMessage');
        if (err) { return next(err); }
        if(user) {
          return req.logIn(user, function(err) {
            req.session.isAdminLogin = true;
            return res.json( {valid: 'success', adminUser: req.isAuthenticated()} )
          });
        }
        if (!user) {
          return res.json( {  valid: error.toString() } );
        } else {
          return res.json( { valid: error.toString() } )
        }
      })(req, res, next);
    })

    app.post( "/paragala-api/logout", function (req, res) {
      req.session.isAdminLogin = false;
      req.logout();
      res.send("success")
    })

    app.post( "/paragala-student-api/logout", function (req, res, next) {
      req.session.isLogin = false
      req.session.SN = null
      res.json( {isStudentLogout: req.session.isLogin} )
    })

    app.get( "/paragala-student-api/student", paragalaStudentGET.user )
    app.get( "/paragala-student-api/userResults", paragalaStudentGET.results )
    app.get( "/paragala-student-api/questionBuilder", paragalaStudentGET.questionBuilder )
    app.post( "/paragala-student-api/castUserVotes", paragalaStudentPOST.user )
    app.post( "/paragala-student-api/addStudent", paragalaStudentPOST.addStudent )


    app.get('/main/*', index.partials)
    app.get('/login/*', index.partials)
    app.get('/dashboard/*', index.partials);
    app.get('/database/*', index.partials);
    app.get('/paragala/*', index.partials);
    app.get('/paragalaAddStudent/*', isLoggedIn, index.partials);
    app.get('/paragalaQuestions/*', index.partials);
    app.get('/paragalaResults/*', isLoggedIn, index.partials);

    /*
     * Mr. and Mrs. Rave
     **/
    app.get('/rave/*', index.partials)

    app.all('/*', function(req, res, next) {
      // Just send the index.html for other files to support HTML5Mode
      res.render('index.html', { root: path.join(viewsPath, 'views') });
    });

  };



  function isLoggedIn(req, res, next) {
    console.log('ISLOGIN: ' + req.headers)
    //console.log(util.inspect("AM I: " + req.user.email, {showHidden: true, depth: null}))
    if (req.isAuthenticated()) {
      res.locals.user = req.user
      return next();
    }
    res.redirect('/main/index.html');
  }

  function adminLogin(req, res, next) {
    if(req.user.email == undefined) {
      return next();
    } else if(req.user.email == "canino_jories@hotmail.com") {
      return next();
    }

    res.redirect('/main/index.html')
  }

  function login(req, res, next) {
     if (req.user) {
      res.locals.user = req.user
    }
    return next();
  }
