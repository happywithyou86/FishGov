(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require('mongoose');

  var Dates_LoginSchema = new mongoose.Schema({
    linkedinId    : String,
    dates_login_in: {
      type: Date,
      default: Date.now
    }
  });

  module.exports = mongoose.model('Dates_Login', Dates_LoginSchema);
}());
