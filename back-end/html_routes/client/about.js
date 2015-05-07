(function() {
  'use strict';

  var router  = io.express.Router();

  router.get('/client/about/index.html', function(req, res) {
    res.render('client/about/index.html');
  });

  module.exports = router;
}());
