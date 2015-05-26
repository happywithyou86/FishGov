(function() {
  'use strict';

  exports.findList = function(options) {
    return options.io[options.name]
      .find(options.find || {})
      .sort(options.sort || {})
      .exec()
      .then(function(result) {
        console.log(result);
        options.res.status(200).send(result);
      });
  };

  exports.findOne = function(options) {
    return options.io[options.name]
      .findOne(options.find)
      .exec()
      .then(function(result) {
        options.res.json(result);
      });
  };

  exports.findOneSavedItems = function(options) {
    io[options.name]
      .find(options.find, 'item_id')
      .exec(function(err, result) {
        return result;
      })
      .then(function(result) {
        io.createSendToken(io, options.foundUser, result, options.res);
      });
  };

  exports.findOneById = function(options) {
    return io[options.name]
      .findById(options.find.toString())
      .exec(function(err, result) {
        console.log(err);
        return result;
      })
      .then(function(result) {
        options.res.json({
          message: options.message,
          status: 200,
          data: result
        });
      });
  };
}());
