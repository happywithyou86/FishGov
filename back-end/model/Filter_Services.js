(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require('mongoose');

  var Filter_ServicesSchema = new mongoose.Schema({
    code: String,
    name: String,
    count: Number
  });

  module.exports = mongoose.model('Filter_Services', Filter_ServicesSchema);
}());
