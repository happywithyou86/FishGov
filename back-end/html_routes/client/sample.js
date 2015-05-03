(function() {
  'use strict';

  var router  = io.express.Router();

  router.get('/client/sample/index.html', function(req, res) {
    res.render('client/sample/index.html');
  });

  module.exports = router;
}());
