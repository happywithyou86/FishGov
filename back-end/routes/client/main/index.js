(function() {
  'use strict';

  var node    = app_require( 'services/module.config' ),
      router  = node.express.Router();

  router.get('/client/main/index.html', function( req, res ) {
    res.render( 'client/main/index.html' );
  });

  module.exports = router;
}());
