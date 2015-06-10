(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require('mongoose');

  var Filter_ProductsSchema = new mongoose.Schema({
    code: String,
    name: String,
    count: Number
  });

  module.exports = mongoose.model('Filter_Products', Filter_ProductsSchema);
}());
