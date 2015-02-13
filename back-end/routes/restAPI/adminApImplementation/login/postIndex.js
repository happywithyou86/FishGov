(function() {
  'use strict';

  exports.postUserLogin = function(req, res, next) {
    global.io.passport.authenticate('local-login', function(err, user) {
     if (err) {next(err);}

      req.login(user, function(err) {
       if (err) {return next(err);}
        global.io.createSendToken(global.io, user, res);
      });
    })(req, res, next);
  };

  exports.postGoogleLogin = function(req, res, next) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      code: req.body.code,
      grant_type: 'authorization_code',
      client_secret: global.io.config.GOOGLE_SECRET,
    };

    global.io.googleAuth(global.io, params, res);
  };

  exports.postFacebookLogin = function(req, res, next) {
    var params = {
      client_id: req.body.clientId,
      redirect_uri: req.body.redirectUri,
      client_secret: global.io.config.FACEBOOK_SECRET,
      code: req.body.code
    };

    global.io.facebookAuth(global.io, params, res);
  };
}());
