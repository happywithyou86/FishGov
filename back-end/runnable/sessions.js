var db        = require('promised-mongo')('paragala'),
      Promise = require('bluebird'),
      mongo   = require('../configuration/mongodb');
var promises = [];

  promises.push(
    db.collection('questions').insert({

    }));
