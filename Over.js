function gameover() {
    // Initialize Firebase

    life -= 1; $("#gameOver").fadeIn(1000); 
    for (var i=0; i<timerArray.length; ++i){
        clearTimeout(timerArray[i]);
    }
    document.getElementById("myAudio").pause();
    document.getElementById("label").classList.add("active");
    setTimeout(updateLeaderboard(),1000);
}


