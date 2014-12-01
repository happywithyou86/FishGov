  'use strict'

  var express     = require('express'),
      _           = require('underscore')._,
      path        = require('path'),
      colors 			= require('colors'),
      passport 		= require('passport'),
      cluster     = require('cluster'),
      numCPUs     = require('os').cpus().length,

      databaseApi = require('./routes/restApi/api/databaseApi'),
      adminApi    = require('./routes/restApi/api/adminApi'),
      paragalaApi = require('./routes/restApi/api/paragalaApi'),
      primary     = require('./routes/clientRoutes/primary'),
      profile     = require('./routes/clientRoutes/profile'),
      dashboard   = require('./routes/clientRoutes/dashboard'),
      database    = require('./routes/clientRoutes/database'),
      paragala    = require('./routes/clientRoutes/paragala'),
      adminPanelParagalaQuestions = require('./routes/clientRoutes/adminPanel/paragala/questions.js'),
      catchAll    = require('./routes/clientRoutes/all');

    /**
     ** Configuration File NoSQL Database
    ***/
    require('./configuration/mongodb'); //mongodb integration

    /**
     ** Start our Express Server
    ***/
    var app = express();

    /**
     ** Require our Configuration Files
    ***/
    require('./configuration/express')(app);
    require('./configuration/passport')(passport);

    /**
     ** Routes
    ***/
    //require('./config/routes')(app,  passport);

    app.use( '/database-api', databaseApi );
    app.use( '/admin-api', adminApi );
    app.use( '/paragala-student-api', paragalaApi );
    app.use( '/', primary );
    app.use( '/', profile );
    app.use( '/', database );
    app.use( '/', dashboard );
    app.use( '/', paragala );
    app.use( '/', adminPanelParagalaQuestions);
    app.use( '*', catchAll );

    /**
     ** Cluster Configuration
    ***/
    if (cluster.isMaster) {
      /**
       ** Fork Workers
      ***/
      var timeouts = [];
      /**
       ** Use a Vanilla for loop
       ** to fork our Clusters
      ***/
      for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
      cluster.on('fork', function(worker) {
        timeouts[worker.id] = setTimeout(errorMsg, 2000);
      });
      cluster.on('online', function(worker) {
        console.log( worker.id + ' is online' );
      });
      cluster.on('listening', function(worker, address) {
        clearTimeout(timeouts[worker.id]);
        console.log("A worker is now connected to " + address.address + ":" + address.port);
      });
    } else {
      app.listen(app.get('port'), function() {
        console.log("listening to port ".cyan + "%s".magenta, app.get('port'))
      })
    }

    /**
     ** Function for using Error Message
     ** for the Worker
    ***/
    function errorMsg() {
      console.error("Something must be wrong with the connection ...");
    }
