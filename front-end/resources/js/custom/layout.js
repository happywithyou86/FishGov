+ function( $ ) { "use strict";

  var Layout = function (SidebarWidth) {
    this.jcaSideBarWidth = SidebarWidth;
    return this;
  };

  Layout.prototype.init = function () {
    console.log( 'Layout.js is running ');
    this.carousel();
    this.fullPage();

    return this;
  };

  Layout.prototype.carousel = function() {
    $('.carousel').carousel({
      interval: 3000,
      pause: "hover",
      wrap: true
    });
  };

  Layout.prototype.fullPage = function() {

      $('#fullpage').fullpage({
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#ccc', '#fff', '#E6E6E6'],
        anchors:['', 'databasePage', 'paragalaPage'],
        scrollingSpeed: 700,
        easing: 'easeInQuart',
        menu: true,
        navigation: false,
        navigationPosition: 'right',
        navigationTooltips: ['', 'databasePage', 'paragalaPage'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        loopBottom: false,
        loopTop: false,
        loopHorizontal: true,
        autoScrolling: true,
        scrollOverflow: false,
        css3: false,
        paddingTop: '40px',
        paddingBottom: '0px',
        normalScrollElements: '#element1, .element2',
        normalScrollElementTouchThreshold: 5,
        keyboardScrolling: true,
        touchSensitivity: 15,
        continuousVertical: false,
        animateAnchor: true,
        sectionSelector: '.section',
        slideSelector: '.slide',

        //events
        onLeave: function(index, nextIndex, direction){},
        afterLoad: function(anchorLink, index){},
        afterRender: function(){},
        afterResize: function(){},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
        onSlideLeave: function(anchorLink, index, slideIndex, direction){}
      });

      $('.selectSection').on('click', function() {
        console.log( 'select Section' );
        $.fn.fullpage.moveSectionDown();
      });

  };
  window.jcaLayout = new Layout();

}( jQuery );
