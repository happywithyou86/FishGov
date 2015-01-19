(function() {
  'use strict';

  var express = require('express'),
  router  = express.Router();

  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  });

  router.get( '*',  function(req, res) {
    var email = req.user === undefined? '': req.user.email;
    res.render( 'index.html' );
  });

  module.exports = router;
})();
