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

  exports.findOneById = function(options) {
    console.log('jories');
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
