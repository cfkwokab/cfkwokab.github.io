
var timeRemaining = 3;          // Amount of time remaining for the countDown

var timeToShowMonster = 469;   // Amount of time to show the monster
var timeToHideMonster = 469;   // Amount of time to hide the monster

var hideMonsterTimeout;         // Timeout id for hiding the monster

var life = 3;                   // The player's life

var poping = false;
var scaleing = 0.2;
var popTime = 200;
var random_number = 0;
var last_div = 0;

var count = 0;
var missed = false;
var d = new Date();
var TimeOfStart = d.getTime();
var gscore = 0;
var killed = false;
var progresss = 0;
var showGlowArray = []
var showTimeArray = []
var timerArray = [];
var lines = [];

function setTimers() {
    $.get('time.txt',  function(data){
        lines = data.split('\n');

    for (var i=0; i<lines.length; ++i){
        showGlowArray.push(lines[i]-200);
        showTimeArray.push(lines[i]-800);
    }
    for (var i=0; i<showTimeArray.length; ++i){
        timerArray.push(setTimeout(glow, showGlowArray[i]));
        timerArray.push(setTimeout(showMonster, showTimeArray[i]));
    }
    }, "text");
    timerArray.push(setTimeout(gameover(), showTimeArray[showTimeArray.length-1]+3000));
    
}



function hideMonster() {
    $(".monster").hide();
    popMonster();
    // Hide the monster
    

    // Show the monster later again

}


function popMonster() {
    /*poping = true;
    missed=false;
    $("#monster").center();
    $("#monster").css( 'transform', 'scale(' + scaleing + ',' + scaleing + ')');
    scaleing = scaleing + 0.1;
    if (scaleing <= 0.19) {
        $("#monster").restorem();
    }
    else if (scaleing > 3.0) gameover();
    else setTimeout(popMonster, 200);*/
}

function getrandomnumber() {
    if ($(window).width() < 900) random_number = Math.random() * 4;
    else random_number = Math.random() * 9;
    random_number = Math.floor(random_number);
    if (random_number == last_div) getrandomnumber();
}
function glow_back() {
    //$("#container").css("box-shadow", "inset 0px 0px 50px 50px rgba(255,255,0,0.6)");
    $(".hole").css("border-color","#009688")
}
function glow() {
        //$("#container").css("box-shadow", "inset 0px 0px 50px 50px rgba(255,255,0,0.6)");
        $(".hole").css("border-color","#52c7b8")
        setTimeout(glow_back, 200);
}
function showMonster() {
    // Find the target div randomly and move the monster
    // to that div
    count = count + 1;
    $(".determinate").css('width', count+3+'%');
    //document.getElementById("count").textContent = "COUNT: "+count;
    if (missed==true&&poping==false) {document.getElementById("monster").classList.add("unhide");popMonster();}
    else {
    getrandomnumber();
    last_div = random_number;
    var random_div = $(".hole").eq(random_number);
    $(".monster").appendTo(random_div);
    // Show the monster
    document.getElementById("monster").classList.remove("unhide");
        killed = false;
        setTimeout(function(){document.getElementById("monster").classList.add("unhide");},1)
        //missed = true;

    // Hide the monster later
    }
}

function addScore() {
    var d2 = new Date();
    var TimeOfKill = d2.getTime();
    var StartToKill = TimeOfKill - TimeOfStart;
    var KillToGlow = lines[count-1] - StartToKill;
    var earn = 1000-Math.abs(KillToGlow);
    gscore = gscore + earn;
    earn = Math.floor(earn);
    document.getElementById("count").textContent = "EARN: "+earn;
    gscore = Math.floor(gscore);
    document.getElementById("score").textContent = "SCORE: "+gscore;
    console.log(earn);
}

function startGame() {
    // Hide the countDown timer 
    $("#countDown").slideUp(400);
    // Show the monster the first time
    d = new Date();
    TimeOfStart = d.getTime();
    setTimers();
    // Set up the click handler of the monster
    $(".monster").on("mousedown", function () {
        var x = document.getElementById("monster").parentElement;
        x.classList.add("hole-blue");
        x.classList.add("z-depth-4");
        setTimeout(function(){x.classList.remove("hole-blue");x.classList.remove("z-depth-4");}, 200);
    });
    $(".monster").on("click", function () {
        if (poping == false) { missed=false; addScore(); killMonster();
    }
        else if (poping == true) {
            scaleing = scaleing - 0.15;
            $(".monster").css('transform', 'scale(' + scaleing + ',' + scaleing + ')');
        }
    });
}

function countDown() {
    document.getElementById("myAudio").play();
    // Decrease the remaining time
    timeRemaining = timeRemaining -1;
    if (timeRemaining == 0) {
        document.getElementById("countDown").textContent = "Start"; 
        setTimeout(startGame, 1000);  // otherwise, start the game when the time is up
        }
    else {document.getElementById("countDown").textContent = timeRemaining;}
    // Continue the countDown if there is still time;
    if (timeRemaining > 0) setTimeout(countDown, 1000);
}


function start() {
    // Decrease the remaining time
    $(".nav-extended").fadeTo(200, 0);
    $("#intro p").fadeTo(200, 0);
    $("#intro button").fadeTo(200, 0);
    $("#intro").fadeOut(1000);
    $("#countDown").fadeIn(100);
    // Start the countDown screen
    setTimeout(countDown, 1300);
}

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this;
}

jQuery.fn.restorem = function () {
    this.css("position", "relative");
    this.css("top", "0px");
    this.css("left", "0px");
    this.css("width", "100%");
    this.css("transform", "scale(1,1)");
    scaleing = 0.2;
    popTime = popTime - 100;
    poping = false;
    return this;
}

$(document).ready(function () { 
    //$('.monster').clickFireworks();
    if ($(window).width() < 900) {       // if width is less than 600px
        $(".hole")[8].remove();
        $(".hole")[7].remove();
        $(".hole")[6].remove();
        $(".hole")[5].remove();
        $(".hole")[4].remove();
        $("#game-area").css("grid-template-columns", "1fr 1fr");
        $("#game-area").css("grid-template-rows", "1fr 1fr");
        $(".hole").css("width", "40vmin");
        $(".hole").css("height", "40vmin");
    }
    else {                              // if width is more than 600px
        // execute desktop function
    }
});

function killMonster() {
    document.getElementById("monster").classList.remove("unhide");
}

$(document).on("keydown", function (e) {
    if (e.keyCode == 103) {
        if ($(".hole").eq(0).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 104) {
        if ($(".hole").eq(1).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 105) {
        if ($(".hole").eq(2).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 100) {
        if ($(".hole").eq(3).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 101) {
        if ($(".hole").eq(4).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 102) {
        if ($(".hole").eq(5).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 97) {
        if ($(".hole").eq(6).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 98) {
        if ($(".hole").eq(7).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 99) {
        if ($(".hole").eq(8).children().length) { pressFireworks(); killMonster(); };
    }
    if (e.keyCode == 27) {
        gameover();
    }
});