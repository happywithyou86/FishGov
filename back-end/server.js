(function() {
  'use strict';

  global.app_require = function(name) {
    return require( __dirname + '/' + name );
  };

  var node      = app_require( 'services/module.config' ),
      main      = require( './routes/client/main' ),
      sample    = require( './routes/client/sample' ),

      registerUserApi = require( './routes/restApi/API/registerNsignInApi' ),
      catchAll  = require( './routes' );

  /*Configuration File NoSQL Database*/
  require( './configuration/mongodb' ); //mongodb integration
  /*Start our Express Server*/
  var app = node.express();
  /*Require our Configuration Files*/
  require( './configuration/express' )(app);
  require( './configuration/passport' )(node.passport);
  /*Routes*/
  useApp([main,sample,registerUserApi]);
  useApi([{
    name: '/userApi',
    url: registerUserApi
  }]);
  app.use( '*', catchAll );

  /*node.cluster Configuration*/
  if (node.cluster.isMaster) {
    node.clusterService( node );
  } else {
    app.listen(app.get('port'), function() {
      console.log( node.chalk.red.reset.underline('listening to port ') +  node.chalk.cyan.bold((app.get('port'))));
    });
  }

  function useApp( param ) {
    param.forEach(function( name ) {
      app.use( '/', name );
    });
  }

  function useApi( param ) {
    for( var key in param ) {
      var obj = param[key];
      app.use( obj.name, obj.url );
    }
  }

}());
