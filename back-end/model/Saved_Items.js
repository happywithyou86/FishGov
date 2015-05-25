(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require('mongoose');

  var Saved_ItemsSchema = new mongoose.Schema({
    user_id : String,
    item_id : String,
    date: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Saved_Items', Saved_ItemsSchema);
}());
