var submitted = false;
var justSubmitted = false;
var name = "";
function yourScore() {
    if (submitted == false){
        var li_1 = document.createElement("li");
        li_1.classList.add("collection-item");
        var div_1 = document.createElement("div");
        var text_1 = document.createTextNode("Player "+gscore);  
        div_1.appendChild(text_1);
        var button_1 = document.createElement("a");
        button_1.classList.add("waves-effect");
        button_1.classList.add("waves-light");
        button_1.classList.add("submit-button");
        var button_text = document.createTextNode("Submit score"); 
        button_1.appendChild(button_text);
        var div_2 = document.createElement("div");
        div_2.classList.add("secondary-content");
        div_2.appendChild(button_1);
        li_1.appendChild(div_1);
        div_1.appendChild(div_2);
        document.getElementById("leaderboard-list").appendChild(li_1);
    }
}
function saveToFirebase(value) {
    // Add a new document in collection "cities"
    if ($(window).width() < 600) {
        firebase.firestore().collection("Leaderboard-Small").doc(value).set({
            name: value,
            score: gscore,
        }).then(function () {
            console.log("Document successfully written!");
            submitted = true;
            justSubmitted = true;
            updateLeaderboard();
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }
    else {
        firebase.firestore().collection("Leaderboard").doc(value).set({
            name: value,
            score: gscore,
        }).then(function () {
            console.log("Document successfully written!");
            submitted = true;
            justSubmitted = true;
            updateLeaderboard();
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }
}


function updateLeaderboard(){
    $("#preloader2").center();
    document.getElementById("preloader2").classList.remove("hide");
    while (document.getElementById("leaderboard-list").firstChild) {
        document.getElementById("leaderboard-list").removeChild(document.getElementById("leaderboard-list").firstChild);
    }
    if (submitted==false)yourScore();
    if ($(window).width() < 600) {
        firebase.firestore().collection("Leaderboard-Small").orderBy("score", "desc").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {                
                var x = document.createElement("li");
                x.classList.add("collection-item");
                if (doc.data().name == name) x.id = "collection-my-item";
                var y = document.createElement("div");
                var t1 = document.createTextNode(doc.data().name);  
                y.appendChild(t1);
                var z = document.createElement("div");
                z.classList.add("secondary-content");
                var t2 = document.createTextNode(doc.data().score);  
                z.appendChild(t2);
                x.appendChild(y);
                y.appendChild(z);
                document.getElementById("leaderboard-list").appendChild(x);
                $("#leaderboard-container").center();
            });
        });}
    else {
        firebase.firestore().collection("Leaderboard").orderBy("score", "desc").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {                
                var x = document.createElement("li");
                x.classList.add("collection-item");
                if (doc.data().name == name) x.id = "collection-my-item";
                var y = document.createElement("div");
                var t1 = document.createTextNode(doc.data().name);  
                y.appendChild(t1);
                var z = document.createElement("div");
                z.classList.add("secondary-content");
                var t2 = document.createTextNode(doc.data().score);  
                z.appendChild(t2);
                x.appendChild(y);
                y.appendChild(z);
                document.getElementById("leaderboard-list").appendChild(x);
                $("#leaderboard-container").center();
            });
        });
    }
    setTimeout(function(){
        document.getElementById("preloader2").classList.add("hide");
        if (justSubmitted == true && document.getElementById("collection-my-item"!=null)){
            document.getElementById("collection-my-item").scrollIntoView(); 
            justSubmitted = false;
        }
    },1000);
}
function gameover() {
    console.log("over");
    // Initialize Firebase
    document.getElementById("monster").classList.add("hide");
    life -= 1; $("#gameOver").fadeIn(1000); 
    for (var i=0; i<timerArray.length; ++i){
        clearTimeout(timerArray[i]);
    }
    document.getElementById("myAudio").pause();
    setTimeout(function(){
        document.getElementById("leaderboard-container").classList.add("unhide-leaderboard");
    },1800);
    setTimeout(function(){
        document.getElementById("gameover").classList.add("hide-gameover");
    },2000);
    if (navigator.onLine==true){
        setTimeout(updateLeaderboard(),1000);

        $(document).on("keydown", function (e) {
            if (e.keyCode == 13) {
                if (submitted==false) ask_for_name();
            }
        });
        $(".submit-button").on("click", function () {
            if (submitted==false) ask_for_name();
        });
    }
    else {$("#leaderboard-container").center();}
}

function ask_for_name(){
    name = prompt("What's your name?");
    if (name=="null") {console.log("User cancelled submit");}
    else if (name!="") saveToFirebase(name);
}

function replay() {
    var c = confirm("Want to replay?");
    if (c==true){
        document.getElementById("leaderboard-container").classList.remove("unhide-leaderboard");
        setTimeout(function(){location.reload(false);}, 1000);
    }
}
