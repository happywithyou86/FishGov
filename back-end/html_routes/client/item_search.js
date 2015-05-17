(function() {
  'use strict';

  var router  = io.express.Router();

  router.get('/client/main/item_search.html', function(req, res) {
    res.render('client/main/item_search.html');
  });

  module.exports = router;
}());
