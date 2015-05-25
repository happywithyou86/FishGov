(function() {
  'use strict';

  exports.clicked_items = function(user, req, res, next) {
    var query   = io.url.parse(req.url, true).query,
        options = {
          find: query.item_id,
          message: 'Users clicked',
          modify: { $inc: { clicked: 1 }, user_id: user.sub, item_id: query.item_id},
          name: 'Clicked_Items',
          res: res
        };

    io.mongoDB(io.config.dbName)
      .then(function() {
        io.update.findOneAndUpdateClickItems(options);
      });
  };
}());
