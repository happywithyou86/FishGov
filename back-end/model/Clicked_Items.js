(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require('mongoose');

  var Clicked_ItemsSchema = new mongoose.Schema({
    user_id : String,
    item_id : String,
    clicked : Number,
  });

  module.exports = mongoose.model('Clicked_Items', Clicked_ItemsSchema);
}());
