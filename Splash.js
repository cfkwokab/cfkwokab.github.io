function splash() {
    stage = 1;
    setTimeout(function(e){
        $("#preloader").fadeOut(100);
    }, 1000)
    setTimeout(function(e){
        $("#icon").addClass("scale-in");
    }, 1500)
    setTimeout(function(e){
        $(".start-button").fadeTo(100,1);
    }, 2000)
    setTimeout(function(e){
        $(".add-button").fadeTo(100,1);
    }, 2100)
}

function start() {
    window.removeEventListener('resize', function(){$("#icon").center();$("#preloader").center();}, true);
    // Decrease the remaining time
    $("#intro").fadeOut(1000);
    $("#countDown").fadeIn(100);
    // Start the countDown screen
    setTimeout(countDown, 1300);
}

$(document).ready(function () {
    $("#icon").center();
    $("#preloader").center();
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left',
      hoverEnabled: false
    });
    splash();
    window.addEventListener('resize', function(){$("#icon").center();$("#preloader").center();}, true);
});