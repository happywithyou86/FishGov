(function() {
  'use strict';

  module.exports = function(io, params, res) {
    io.request({
      url: io.config.FACEBOOK_ACCESS_TOKEN_URL,
      qs: params,
      json: true,
      method: 'POST'
    }).then(function(accessToken, handleError) {
      accessToken = io.qs.parse(accessToken);
      return io.request({
        url: io.config.FACEBOOK_GRAPHAPI_URL,
        qs: accessToken,
        json: true,
        Method: 'GET'
      });
    }).then(function(profile, handleError) {
      io.mongoDB(io.config.dbName);
      return profile;
    }).then(function(facebookData) {
       io.User.findOne({
        facebookId: facebookData.id.toString()
      }, findUser);

      function findUser(err, foundUser) {
       if (foundUser) {
          io.createSendToken(io, foundUser, res);
        } else {
          io.User.findOne({
            email: facebookData.email
          }, function(err, user) {
           if (err) {throw err;}

           if (user) {
              io.User.findOneAndUpdate({email: user.email},
                {
                  firstName:facebookData.first_name,
                  lastName: facebookData.last_name,
                  facebookId: facebookData.id,
                  displayName: facebookData.name
                },
                function(err, user) {
                  io.createSendToken(io, user, res);
              });
            } else {
              var newUser = io.User({
                email: facebookData.email,
                firstName: facebookData.first_name,
                lastName: facebookData.last_name,
                facebookId: facebookData.id,
                displayName: facebookData.name
              });
              newUser.save(function(err) {
                io.createSendToken(io, newUser, res);
              });
            }
          });
        }
      }
    });
  };
}());
