(function() {
  'use strict';

  global.app_require = function(name) {
    return require( __dirname + '/' + name );
  };

  var node      = app_require( 'services/module.config' ),
      sample    = require( './routes/client/sample' ),
      catchAll  = require( './routes' );

  /**
  ** Configuration File NoSQL Database
  ***/
  require( './configuration/mongodb' ); //mongodb integration

  /***
   ** Start our Express Server
   ***/
  var app = node.express();

  /***
   ** Require our Configuration Files
   ***/
  require( './configuration/express' )(app);

  /***
   ** Routes
   ***/
  app.use( '/', sample );
  app.use( '*', catchAll );

  /***
   ** node.cluster Configuration
   ***/
  if (node.cluster.isMaster) {
    node.clusterService( node );
  } else {
    app.listen(app.get('port'), function() {
      console.log( node.chalk.red.reset.underline('listening to port ') +  node.chalk.cyan.bold((app.get('port'))));
    });
  }


}());
