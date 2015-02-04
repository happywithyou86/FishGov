(function($) { 'use strict';

  var Layout = function (SidebarWidth) {
    this.jcaSideBarWidth = SidebarWidth;
    return this;
  };

  Layout.prototype.init = function () {
    console.log('Layout.js is running');
    this.carousel();
    this.fullPage();

    return this;
  };

  Layout.prototype.carousel = function() {
    // $('[data-toggle="switch"]').bootstrapSwitch('onSwitchChange',function() {
    //   var self = this;
    //   var switchObj = $(':checkbox');
    //   /* Get the state of this */
    //   var state = $(self).bootstrapSwitch('state');
    //   console.log(self );
    //   for(var i=0;i<=2;i++) {
    //     if(switchObj[i] !== self )
    //       $(switchObj[i]).bootstrapSwitch('state', false);
    //   }
    // });

    if ($('[data-toggle="switch"]').length) {
      $('[data-toggle="switch"]').bootstrapSwitch();
    }
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
        onLeave: function(index, nextIndex, direction) {},
        afterLoad: function(anchorLink, index) {},
        afterRender: function() {},
        afterResize: function() {},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function(anchorLink, index, slideIndex, direction) {}
      });

      $('.selectSection').on('click', function() {
        $.fn.fullpage.moveSectionDown();
      });

  };
  window.jcaLayout = new Layout();

}($));
