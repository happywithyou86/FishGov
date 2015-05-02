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
  require('./configuration/passport')(io.passport);

  /*Routes*/
  io.useApp(app);
  io.useApi(app);
  app.use(afterResponse);
  app.use('*', catchAll);

  /*global.io.cluster Configuration*/
  if (global.io.cluster.isMaster) {global.io.clusterService(global.io);}
  else {
    app.listen(io.port, function() {
      console.log(io.chalk.red.reset.underline('listening to port ') +
      io.chalk.cyan.bold((io.port)));
    });
  }

  function afterResponse(req, res, next) {
  var response = function(db) {
    io.mongoose.connection.close(function (db) {
      console.log('Mongoose connection disconnected upon close');
    });
  };
  var disconnectAsync = function() {
    io.mongoose.disconnectAsync(function() {
      console.log('Mongoose connection disconnected upon disconnect');
      response();
    });
  };
  res.on('finish', disconnectAsync);
  next();
}
}());
