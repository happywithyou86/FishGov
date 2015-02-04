(function() {
  'use strict';

  module.exports = function(del, util, logger, path, done) {
    logger(util, 'Cleaning: ' + path);
    del(path, done);
  };
}());
