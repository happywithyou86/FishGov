(function() {
  'use strict';

  exports.saved_items = function(user, req, res, next) {
    var query   = req.body,
        options = {
          message : 'Saving Data from Saved_Items',
          name    : 'Saved_Items',
          res     : res,
          details : {
            user_id     : user.sub,
            item_id     : query.item_id,
            title       : query.title,
            keyword     : query.keyword,
            solnbr      : query.solnbr,
            due_date    : query.close_date,
            agency      : query.agency,
            posted_date : query.posted_date,
            office      : query.office,
            description : query.description
          }
        };

    io.mongoDB(io.config.dbName)
      .then(function() {
        io.save._(options);
      });
  };
}());
