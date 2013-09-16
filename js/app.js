$(document).ready(function() {
  var featuredEventURL = "https://www.facebook.com/events/632339026790481";

  var rotator1URL = "https://www.facebook.com/events/203606313146333";
  var rotator2URL = "https://www.facebook.com/events/192882777559352";

  var togglepoint = 610 // Width, in px, to turn on/off the rotator
  var rotator;
  var debug = true;

  var r_time = 5000; // Time per slide.

  /*
   * Home made throttler.
   ****************************************/

  function calm_down(fn, calm) {

    if(typeof fn !== "function") {
      console.log("You need to supply a valid function");
      return;
    }

    var _calm = calm || 200;
    var _t;

    return function() {
      clearInterval(_t);
      _t = setTimeout(function(){
        fn.apply(undefined, arguments);
      }, _calm);
    };
  }

  /*
   * Scroll to a specific div, animated.
   ******************************************/
  function scrollTo(selector) {
    var offset = $(selector).offset().top;
    $("html, body").animate({ scrollTop : offset}, 300);
  }

  /*
   * Toggles the rotator.
   ****************************************/

  function toggle_rotator() {
    // If we're at a narrow width and there's a rotator,
    // then destroy it.
    if(window.innerWidth < togglepoint) {
      if(rotator){
        rotator.destroySlider();
        rotator = null;
      }

      $(".rotator-dots").hide();
    }

    // If we're bigger than the toggle point, make sure there's
    // a rotatorl
    else if (!rotator && window.innerWidth >= togglepoint) {
      $(".rotator-dots").show();
      rotator = $('.bxslider').bxSlider({
        auto: true,
        pause: r_time,
        autoHover: true,
        controls: false,
        pager: true,
        pagerCustom: '.rotator-dots'
      });
    }
  }


  /*
   * Content rotator
   ***********************************/

  // Initialize rotator components
  function init_rotator() {

    var dots = $(".rotator-dots");

    // Make a dot for each slide.
    for(var i = 0; i < $(".rotator-item").size(); i++) {
      dots.append("<a class='rotator-dot' data-slide-index='" + i + "'></a>");
    }

    toggle_rotator();

    $(window).resize(calm_down(toggle_rotator));

  }

  /*
   * Bindings
   ***********************************/
   $("#menu-about").click(function(){
    scrollTo(".about-text");
   });

   $("#menu-events").click(function(){
    scrollTo(".featured-event");
   });

   $(".featured-event").click(function(){
    window.location.href = featuredEventURL;
   });

   $(".rotator-item-1").click(function(){
    window.location.href = rotator1URL;
   });

   $(".rotator-item-2").click(function(){
    window.location.href = rotator2URL;
   });

  /*
   * Initialization 
   ***********************************/
  init_rotator();


});