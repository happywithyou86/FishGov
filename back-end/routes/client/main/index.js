(function() {
  'use strict';

  var node    = appRequire('services/module.config'),
      router  = node.express.Router();

  router.get('/client/main/index.html', function(req, res) {
    res.render('client/main/index.html');
  });

  module.exports = router;
}());
