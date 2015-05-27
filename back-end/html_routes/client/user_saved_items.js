(function() {
  'use strict';

  var router  = io.express.Router();

  router.get('/client/main/user_saved_items.html', function(req, res) {
    res.render('client/main/user_saved_items.html');
  });

  module.exports = router;
}());
