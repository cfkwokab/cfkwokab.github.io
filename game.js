
var timeRemaining = 3;          // Amount of time remaining for the countDown

var timeToShowMonster = 2000;   // Amount of time to show the monster
var timeToHideMonster = 2000;   // Amount of time to hide the monster

var hideMonsterTimeout;         // Timeout id for hiding the monster

var life = 3;                   // The player's life

function hideMonster() {
    // Change the life and the colour of the holes
    if (life == 3){life-=1; $(".hole").css("border-color", "yellow");}
    else if (life == 2){life-=1; $(".hole").css("border-color", "red");}
    // If the game is over show the game over screen
    else if (life == 1){life-=1; $("#gameOver").slideDown(400); clearTimeout(showMonster);}
    // Hide the monster
    $("#monster").hide();

    // Show the monster later again
    if(life!=0)hideMonsterTimeout = setTimeout(showMonster, timeToShowMonster);
}

function showMonster() {
    // Find the target div randomly and move the monster
    // to that div
    var random_number = Math.random() * 9;
    random_number = Math.floor(random_number);
    var random_div = $(".hole").eq(random_number);
    $("#monster").appendTo(random_div);
    // Show the monster
    $("#monster").show();

    // Hide the monster later
    hideMonsterTimeout = setTimeout(hideMonster, timeToHideMonster);
}

function killMonster() {
    if (life != 0) {
        // - Clear the previous timeout
        clearTimeout(hideMonsterTimeout);
        // - Hide the monster
        $("#monster").hide();
        // - Adjust the monster time
        timeToShowMonster = timeToShowMonster - 100;
        timeToHideMonster = timeToHideMonster - 100;
        // - Show the monster later again
            hideMonsterTimeout = setTimeout(showMonster, timeToShowMonster);
    }
}

function startGame() {
    // Hide the countDown timer 
    $("#countDown").slideUp(400);
    // Show the monster the first time
    hideMonsterTimeout = setTimeout(showMonster, timeToShowMonster);
    // Set up the click handler of the monster
    $("#monster").on("click", function(){
        killMonster();
    });
}

function countDown() {
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
$(document).ready(function () {
    $("#monster").appendTo('#game-area');
    $('#monster').clickFireworks();
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