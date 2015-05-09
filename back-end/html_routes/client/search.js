(function() {
  'use strict';

  var router  = io.express.Router();

  router.get('/client/main/search.html', function(req, res) {
    res.render('client/main/search.html');
  });

  module.exports = router;
}());
