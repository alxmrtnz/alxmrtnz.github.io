docReady(function() {
    console.log('loaded');

    // Helper Functions

    function hasClass(ele,cls) {
      return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
    }

    function addClass(ele,cls) {
      if (!hasClass(ele,cls)) ele.className += " "+cls;
    }

    function removeClass(ele,cls) {
      if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
      }
    }

    // Main Functionality

    // var footballer = document.querySelector('.football-trigger');
    // var homeBG = document.querySelector('.js-homepage-img-toggle');

    // footballer.onmouseover = function(){
    //     console.log('hover');
    //     addClass(homeBG, 'show-opacity');
    // };

    // footballer.onmouseout = function(){
    //     console.log('hover');
    //     removeClass(homeBG, 'show-opacity');
    // };

});