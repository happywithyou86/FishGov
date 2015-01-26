(function() {
  'use strict';

  var node    = app_require( 'services/module.config' ),
      router  = node.express.Router();


  router.use(function timeLog( req, res, next) {
    console.log( 'Time: ', Date.now() );
    next();
  });

  router.get( '*',  function( req, res ) {
    res.render( 'index.html' );
  });

  module.exports = router;
})();
