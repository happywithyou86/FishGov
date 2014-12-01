
	"use strict";

	var LocalStrategy = require('passport-local').Strategy,
			mongo					= require('./mongodb'),
			Promise 			= require('bluebird'),
	 		bcrypt				= require('bcrypt-nodejs');


	module.exports = function(passport) {
		passport.serializeUser(function(user, done) {
			console.log("SERIALIZER: " + user._id)
	    done(null, user._id);
	   });

	  passport.deserializeUser(function(id, done) {
			mongo.db( 'admin' )
				.collection( 'users' )
				.findOne({_id:id})
				.then(function( user ) {
					if( user ) {
						done( null, user )
					} else {
						mongo.db( 'paragala' )
							.collection( 'students' )
							.findOne( {'_id': id} )
							.then(function( paragalaUser ) {
								console.log( paragalaUser )
								done( null, paragalaUser )
							})
					}

				})
	  })

	  passport.use('local-login', new LocalStrategy({
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback: true //allows us to pass back the entire request to the callback
			},
				function (req, email, password, done) {
					mongo.db( 'admin' )
						.collection( 'users' )
						.findOne({'_id': email})
						.then(function( user ) {
							console.log("++++++++ Data found with the email " + email)
							if (user == null) {
								console.log( 'email not found' )
								return done( null , false, req.flash('loginMessage', 'No user found.') )
							}

							if( bcrypt.compareSync(password, user.password) == !true ) {
								console.log( 'password not match' )
								return done( null, false , req.flash('loginMessage', 'Opps! Wrong password') )
							}

							console.log( 'user is been authenticated' )
							return done(null, user)
						})
			}
		))

		passport.use('local-student', new LocalStrategy({
			usernameField : 'studentNumber',
			passwordField	: 'password',
			passReqToCallback: true
		}, function( req, studentNumber, password, done ) {
				console.log( 'StudentNumber: ' + studentNumber )
				mongo.db( 'paragala' )
					.collection( 'students' )
					.findOne( {'_id': studentNumber} )
					.then(function( paragalaUser ) {
						console.log( 'PARAGALA USER: ' + paragalaUser )
						return done(null, paragalaUser)
					})
		}))
	}
