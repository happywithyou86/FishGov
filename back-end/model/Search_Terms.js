(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require('mongoose');

  var Search_TermsSchema = new mongoose.Schema({
    user_id     : String,
    keyword     : String,
    times_used  : Number
  });

  module.exports = mongoose.model('Search_Terms', Search_TermsSchema);
}());
