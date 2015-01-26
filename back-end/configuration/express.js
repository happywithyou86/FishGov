(function() {
  'use strict';

  var node_module = app_require( 'services/module.config' );


  /***
  ** Express Configuration
  ***/
  module.exports = function (app) {
    node_module.nunjucksEnv.express( app );
    node_module.nunjucks.configure( node_module.nunjucksPath, {
      autoescape: true,
      express: app,
      watch: true,
      tags: {
        variableStart: '<$',
        variableEnd: '$>',
      }
    });
    app.set( 'port', process.env.PORT || 3000 );
    app.set( 'view engine', 'html' );
    app.use( node_module.compression() );
    app.use( node_module.favicon( node_module.faviconPath ));
    app.use( node_module.logger('dev') );
    app.use( node_module.bodyParser.urlencoded({extended:true}) );
    app.use( node_module.bodyParser.json() );
    app.use( node_module.multer() );
    app.use( node_module.methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    }));
    app.use( node_module.passport.initialize() );
    app.use( '/css', node_module.express.static( node_module.css ));
    app.use( '/fonts', node_module.express.static( node_module.fonts ));
    app.use( '/img', node_module.express.static( node_module.img ));
    app.use( '/js', node_module.express.static( node_module.js ));
    app.use( '/bowerComponents', node_module.express.static( node_module.bowerComponents ));
    app.use( '/commonViews', node_module.express.static( node_module.commonViews ));
    app.use( '/compiledCss', node_module.express.static( node_module.compiledCss ));

    /***
    ** Setup for CORS
    ***/
    app.use(function( req, res, next ) {
      res.header( 'Access-Control-Allow-Origin', '*' );
      res.header( 'Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE' );
      res.header( 'Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
      next();
    });

  };
}());
