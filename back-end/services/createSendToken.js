(function() {
  'use strict';

  module.exports = function createSendToken(io, user , res) {
    var payload = {
      sub: user._id.toString(),
      exp: io.moment().add(10, 'days').unix()
    };

    var token = io.jwt.encode(payload, 'shhh..');
    return res.json({
      user: user.toJSON(),
      token: token
    });
  };
}());
