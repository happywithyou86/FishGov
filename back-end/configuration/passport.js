(function() {
	'use strict';

	module.exports = function(passport) {
		passport.serializeUser(function(user, done) {
			done(null, user._id);
		});

		passport.use('local-login', new io.LocalStrategy({
			usernameField: 'email'
		}, function(email, password, done) {
			io.mongoDB(io.config.dbName)
			.then(function(connection) {
				io.User.findOne({
					email: email
				}, function(err, user) {
					if (err) {return done(err);}
					if (!user) {
						return done(null, false, {
							message: 'Wrong email/password'
						});
					}

					user.comparePasswords(password, function(err, isMatch) {
						if (err) {return done(err);}
						if (!isMatch) {
							return done(null, false, {
								message: 'Wrong email/password'
							});
						}
						return done(null, user);
					});
				});
			});
		}));

		passport.use('local-register', new io.LocalStrategy({
			usernameField: 'email'
		}, function(email, password, done) {
			console.log('passport');
			var options = {
				io: io,
				name: 'User',
				details: {
					email: email,
					password: password
				},
				done: done
			};

			io.mongoDB(io, io.config.dbName)
				.then(io.save(options));
		}));
	};
}());
