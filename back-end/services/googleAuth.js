(function() {
  'use strict';

  module.exports = function( node, params, res ) {
    node.request( node.config.GOOGLE_ACESS_TOKEN_URL, {
      form: params,
      json: true,
      method: 'POST'
    }).then(function( token, handleError ) {
      var accessToken = token.access_token;
      var headers = {
        Authorization: 'Bearer ' + accessToken
      };
      return node.request({
        url: node.config.GOOGLE_API_URL,
        headers: headers,
        json: true,
        method: 'GET'
      });
    }).then(function( profile, handleError ) {
      node.mongoDB( node, node.config.dbName );
      return profile;
    }).then(function( googleData ) {
      node.User.findOne({
        googleId: googleData.sub
      }, findUser );

      function findUser( err, foundUser ) {
        if( foundUser ) {
          node.createSendToken( node, foundUser, res );
        } else {
          node.User.findOne({
            email: googleData.email
          }, function( err, user ) {
            if( err ) throw err;
            if( user ) {
              node.User.findOneAndUpdate({email: user.email},
                { firstName:googleData.given_name,
                  lastName: googleData.family_name,
                  facebookId: googleData.sub,
                  displayName: googleData.name
                },
                function( err, user ) {
                  node.createSendToken( node, user, res );
                });
            } else {
              var newUser = node.User({
                email: googleData.email,
                firstName: googleData.given_name,
                lastName: googleData.family_name,
                googleId: googleData.sub,
                displayName: googleData.name
              });
              newUser.save(function( err ) {
                node.createSendToken( node, newUser, res );
              });
            }
          });
        }
      }
    });
  };
}());
