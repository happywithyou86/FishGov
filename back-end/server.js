  'use strict';

  var express     = require('express'),
      _           = require('underscore')._,
      path        = require('path'),
      colors 			= require('colors'),
      passport 		= require('passport'),
      cluster     = require('cluster'),
      numCPUs     = require('os').cpus().length,
      sample      = require('./routes/clientRoutes/sample'),
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
    app.use( '/', sample );
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
        console.log('A worker is now connected to ' + address.address + ':' + address.port);
      });
    } else {
      app.listen(app.get('port'), function() {
        console.log('listening to port '.cyan + '%s'.magenta, app.get('port'));
      });
    }

    /**
     ** Function for using Error Message
     ** for the Worker
    ***/
    function errorMsg() {
      console.error('Something must be wrong with the connection ...');
    }
