(function() {
  'use strict';

  module.exports = function createSendToken(io, user, saved_items, res) {
    var payload = {
      sub: user._id.toString(),
      exp: io.moment().add(1, 'days').unix()
    };

    var token = io.jwt.encode(payload, 'shhh..');
    return res.json({
      user        : user.toJSON(),
      saved_items : saved_items,
      token       : token
    });
  };
}());
