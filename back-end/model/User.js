(function() {
  'use strict';

  var bcrypt    = require('bcrypt-nodejs'),
  mongoose      = require( 'mongoose' );

  var UserSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
    },
    password: String,
    username: String,
    firstName: String,
    lastName: String,
    googleId: String,
    facebookId: String,
    displayName: String
  });

  UserSchema.pre( 'save', function( next ) {
    var user = this;

    if(!user.isModified( 'password' )) {
      return next();
    }

    bcrypt.genSalt( 10, function( err, salt ) {
      if( err ) {
        return next( err );
      }
      bcrypt.hash( user.password, salt, null, hashPassword );
    });

    function hashPassword( err, hash ) {
      if( err ) {
        return next ( err );
      }
      user.password = hash;
      next();
    }
  });

  UserSchema.methods.toJSON = function() {
    var user = this.toObject();
    delete user.password;

    return user;
  };

  UserSchema.methods.comparePasswords = function( password, callback ){
    bcrypt.compare( password, this.password, callback );
  };

  module.exports = mongoose.model(  'User', UserSchema );
}());
