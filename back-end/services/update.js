(function() {
  'use strict';

  exports.findOneAndUpdateClickItems = function(options) {
    console.log(options.find);
    return io[options.name]
      .findOneAndUpdate(
        {item_id: options.find},
        options.modify,
        {upsert: true, new: true},
        function(err, result) {
          if(err){throw err;}
          options.res.json({
            message: options.message,
            status: 200,
            data: result
          });
        }
      );

  };
}());
