(function() {
  'use strict';

  module.exports = function(io, params, res, next) {
    console.log('jories');
    io.request(io.config.LINKEDIN_ACCESS_TOKEN_URL, {
      form: params,
      json: true,
      method: 'POST'
    }).then(function(token, handleError) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };
      return io.request({
        url: io.config.LINKEDIN_API_URL,
        headers: headers,
        json: true,
        method: 'GET'
      });
    }).then(function(profile, handleError) {
      io.mongoDB(io.config.dbName);
      return profile;
    }).then(function(linkedin_data) {
      io.User.findOne({
        linkedinId: linkedin_data.id
      }, findUser);

      function findUser(err, foundUser) {
       if (foundUser) {
          // io.createSendToken(io, foundUser, res);
          var options = {
            message : 'Saving Dates Login',
            name    : 'Dates_Login',
            details : {
              linkedinId: foundUser.linkedinId
            }
          };
          io.save.login_dates(options);
          next(foundUser);
        } else {
          io.User.findOne({
            email: linkedin_data.email
          }, function(err, user) {
           if (err) {next(err);}
           if (user) {
              io.User.findOneAndUpdate({email: user.emailAddress},
                { firstName       : linkedin_data.firstName,
                  lastName        : linkedin_data.lastName,
                  photo           : linkedin_data.pictureUrl,
                  linkedinId      : linkedin_data.id,
                  displayName     : linkedin_data.firstName},
                function(err, user) {
                  io.createSendToken(io, user, 'null', res);
                });
            } else {
              var newUser = io.User({
                email           : linkedin_data.emailAddress,
                firstName       : linkedin_data.firstName,
                lastName        : linkedin_data.lastName,
                photo           : linkedin_data.pictureUrl,
                linkedinId      : linkedin_data.id,
                displayName     : linkedin_data.firstName
              });
              newUser.save(function(err) {
                io.createSendToken(io, newUser, 'null', res);
              });
            }
          });
        }
      }
    });
  };
}());
