(function() {
  'use strict';

  exports.saved_items = function(user, req, res, next) {
    // var query   = req.body,
    //     options = {
    //       message : 'Saving Data from Saved_Items',
    //       name    : 'Saved_Items',
    //       res     : res,
    //       details : {
    //         user_id : user.sub,
    //         item_id : query.id,
    //         clicked :
    //       }
    //     };

    io.mongoDB(io.config.dbName)
      .then(function() {
        // io.
      });
  };

  
}());
// user_id : String,
// item_id : String,
// clicked : Number,
