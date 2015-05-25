(function() {
  'use strict';

  exports.clicked_items = function(user, req, res, next) {
    /*todo if the exp is expired*/

    if (user.sub) {
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
    }
  };

  exports.search_terms = function(user, req, res, next) {
    var query   = io.url.parse(req.url, true).query,
        keyword = query.keyword.toLowerCase(),
        options = {
          find    : {
            user_id : user.sub,
            keyword : keyword
          },
          message : 'Saving Search Terms',
          modify  : {
            $inc :{
              times_used: 1
            },
            user_id: user.sub,
            keyword: keyword
          },
          name    : 'Search_Terms',
          res     : res
        };

    io.mongoDB(io.config.dbName)
      .then(function() {
        io.update.findOneAndUpdateSearchTerms(options);
      });
  };
}());
