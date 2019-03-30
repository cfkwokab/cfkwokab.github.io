
var timeRemaining = 7;          // Amount of time remaining for the countDown

var timeToShowMonster = 469;   // Amount of time to show the monster
var timeToHideMonster = 469;   // Amount of time to hide the monster

var hideMonsterTimeout;         // Timeout id for hiding the monster

var life = 3;                   // The player's life

var pop = false;
var scaleing = 0.2;
var popTime = 200;
var random_number = 0;
var last_div = 0;

var count = 0;
var d = new Date();
var n = d.getTime();
var score = 0;
var killed = false;

function hideMonster() {
    $("#monster").hide();
    popMonster();
    // Hide the monster
    

    // Show the monster later again
    if(life!=0 && pop == false && count<103)hideMonsterTimeout = setTimeout(showMonster, timeToShowMonster);
}

function gameover() {
}

function popMonster() {
}

function randomdiv() {
    if ($(window).width() < 900) random_number = Math.random() * 4;
    else random_number = Math.random() * 9;
    random_number = Math.floor(random_number);
    if (random_number == last_div) randomdiv();
}

function showMonster() {
    // Find the target div randomly and move the monster
    // to that div
    randomdiv();
    last_div = random_number;
    var random_div = $(".hole").eq(random_number);
    $("#monster").appendTo(random_div);
    $("#monster").show("fade", 800);
    // Show the monster
    count = count + 1;
    if (count != 8 || count != 24 || count != 40 || count != 56 || count != 72 || count != 88) {
        killed = false;
        /*$("#monster").css("filter", "grayscale(0%)");*/
        d = new Date();
        n = d.getTime();
}
    if (count == 8 ||count == 24 || count == 40 || count == 56 || count == 72 || count == 88) $("#monster").hide();
    document.getElementById("count").textContent = "PROGRESS: "+count;
    $(".determinate").css("width", count+"%");
    // Hide the monster later
    hideMonsterTimeout = setTimeout(hideMonster, timeToHideMonster);
}

function killMonster() {
        // - Clear the previous timeout
    // - Hide the monster
    if (killed == false) {
        $("#monster").hide();
    killed = true;
    d = new Date();
    var differencet = d.getTime() - n;
    score = score + 1000 - differencet;
    document.getElementById("score").textContent = "SCORE: "+score;
        // - Show the monster later again
    }
}

function startGame() {
    // Hide the countDown timer 
    $("#countDown").slideUp(400);
    // Show the monster the first time
    hideMonsterTimeout = setTimeout(showMonster, 1000);
    // Set up the click handler of the monster
    $("#monster").on("click", function () {
        if (pop == false) { killMonster(); document.getElementById("hit").play();}
        else if (pop == true) {
            scaleing = scaleing - 0.18;
            $("#monster").css('transform', 'scale(' + scaleing + ',' + scaleing + ')');
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
    pop = false;
    return this;
}

$(document).ready(function () {
    $("#monster").appendTo('#game-area');
    $('#monster').clickFireworks();
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
});