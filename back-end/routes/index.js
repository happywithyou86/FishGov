(function() {
  'use strict';

  var node = app_require('services/module.config'),
    router = node.express.Router();


  router.use(function timeLog(req, res, next) {
    console.log( req.headers );
    console.log('Time: ', Date.now());
    next();
  });

  router.get('*', node.xPoweredBy, function(req, res) {
    console.log( req.body );
    res.render('index.html');
  });

  module.exports = router;
})();
