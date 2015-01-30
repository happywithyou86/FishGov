(function() {
  'use strict';

  module.exports = function( node, params, res ) {
    node.request({
      url: node.config.FACEBOOK_ACCESS_TOKEN_URL,
      qs: params,
      json: true,
      method: 'POST'
    }).then(function( accessToken, handleError ) {
      accessToken = node.qs.parse( accessToken );
      return node.request({
        url: node.config.FACEBOOK_GRAPHAPI_URL,
        qs: accessToken,
        json: true,
        Method: 'GET'
      });
    }).then(function( profile, handleError ) {
      node.mongoDB( node, node.config.dbName );
      return profile;
    }).then(function( facebookData ) {
       node.User.findOne({
        facebookId: facebookData.id.toString()
      }, findUser );

      function findUser( err, foundUser ) {
        if( foundUser ) {
          node.createSendToken( node, foundUser, res );
        } else {
          node.User.findOne({
            email: facebookData.email
          }, function( err, user ) {
            if( err ) throw err;

            if( user ) {
              node.User.findOneAndUpdate({email: user.email},
                { firstName:facebookData.first_name,
                  lastName: facebookData.last_name,
                  facebookId: facebookData.id,
                  displayName: facebookData.name
                },
                function( err, user ) {
                  node.createSendToken( node, user, res );
              });
            } else {
              var newUser = node.User({
                email: facebookData.email,
                firstName: facebookData.first_name,
                lastName: facebookData.last_name,
                facebookId: facebookData.id,
                displayName: facebookData.name
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
