(function() {
  'use strict';

  exports.saved_items = function(user, req, res, next) {
    var query   = req.body,
        options = {
          find    : {
            user_id: user.sub
          },
          message : 'Saving Data from Saved_Items',
          name    : 'Saved_Items',
          res     : res
        };

    io.mongoDB(io.config.dbName)
      .then(function() {
        io.delete.findOneAndRemove(options);
      });
  };
}());
