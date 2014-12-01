
  'use strict';

  angular.module( 'strapService', [] )
    .service('$loginModal',function( $modal ){
      var login   = $modal({template:'/commonsHtml/login.html', show:false});

      this.show = function() {
        login.$promise.then(login.show);
      }

      this.hide = function() {
        login.$promise.then(login.hide);
      }
    })
    .service( '$SignUpModal', function( $modal ) {
      var signup  = $modal({template:'/commonsHtml/signup.html', show:false});

      this.show = function() {
        signup.$promise.then(signup.show);
      }

      this.hide = function() {
        signup.$promise.then(signup.hide);
      }
    })
    .service( '$ParagalaLoginModal', function( $modal ) {
      var paragalaLogin  = $modal({template:'/commonsHtml/paragalaLogin.html', show:false});

      this.show = function() {
        paragalaLogin.$promise.then(paragalaLogin.show);
      }

      this.hide = function() {
        paragalaLogin.$promise.then(paragalaLogin.hide);
      }
    })
