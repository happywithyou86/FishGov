(function() {
  'use strict';

  exports.info = function(req, res, next) {
   if (!req.headers.authorization) {return res.json({data:null});}
    var token   = req.headers.authorization.split(' ')[1],
        payLoad,
        options;

      try {
        payLoad = global.io.jwt.decode(token, 'shhh..');
        options = {
          find: payLoad.sub,
          io  : global.io,
          name: 'User',
          res : res
        };

        global.io.mongoDB(global.io.config.dbName)
          .then(global.io.get.findOneById(options));
      } catch (e) {
        return res.json('Unauthorized: TOKEN ERROR');
      }
  };

  exports.saved_items = function(foundUser, req, res, next) {
    if (foundUser) {
      var options = {
        find      : foundUser._id,
        foundUser : foundUser,
        message   : 'Retrieving data from Save_Items',
        name      : 'Saved_Items',
        res       : res
      };

      io.get.findOneByIdInSavedItems(options);
    }
  };
}());
