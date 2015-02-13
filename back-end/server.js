(function() {
  'use strict';

  global.appRequire = function(name) {
    return require(__dirname + '/' + name);
  };

  global.io = appRequire('services/module.config');

  var  catchAll  = require('./routes');

  /*Configuration File NoSQL Database*/
  require('./configuration/mongodb'); //mongodb integration

  /*Start our Express Server*/
  var app = global.io.express();

  /*Require our Configuration Files*/
  require('./configuration/express')(app);
  require('./configuration/passport')(global.io.passport);

  /*Routes*/
  global.io.useApp(app);
  global.io.useApi(app);
  app.use('*', catchAll);

  /*global.io.cluster Configuration*/
  if (global.io.cluster.isMaster) {global.io.clusterService(global.io);}
  else {
    app.listen(global.io.port, function() {
      console.log(global.io.chalk.red.reset.underline('listening to port ') +
      global.io.chalk.cyan.bold((global.io.port)));
    });
  }
}());
