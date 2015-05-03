(function() {
  'use strict';

  exports.info = function(req, res, next) {
    var query = global.io.url.parse(req.url, true).query,
        options = {
          find: query.email,
          io  : global.io,
          name: 'User',
          res : res
        };
    global.io.mongoDB(global.io.config.dbName)
      .then(global.io.get.findOne(options));
  };
}());
