(function() {
  'use strict';

  exports.getUserInfo = function(req, res, next) {
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
}());
