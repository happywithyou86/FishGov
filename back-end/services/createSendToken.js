(function() {
  'use strict';

  module.exports = function createSendToken( node, user , res ) {
    var payload = {
      sub: user._id.toString(),
      exp: node.moment().add(10, 'days').unix()
    };

    var token = node.jwt.encode( payload, 'shhh..');
    return res.json({
      user: user.toJSON(),
      token: token
    });
  };
}());
