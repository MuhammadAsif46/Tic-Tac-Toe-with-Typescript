var music = new Audio("/assets/music.mp3");
var audioTurn = new Audio("/assets/ting.mp3");
var gameover = new Audio("/assets/gameover.mp3");
var turn = "X";
var isgameover = false;
// Function to change the turn
var changeTurn = function () {
    return turn === "X" ? "0" : "X";
};
// Function to check for a win
var checkWin = function () {
    var text = document.getElementsByClassName("text");
    var wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ];
    wins.forEach(function (e) {
        if (text[e[0]].innerText === text[e[1]].innerText &&
            text[e[2]].innerText === text[e[1]].innerText &&
            text[e[0]].innerText !== "") {
            document.querySelector(".info").innerText = text[e[0]].innerText + " Won";
            isgameover = true;
            document
                .querySelector(".imgbox")
                .getElementsByTagName("img")[0].style.width = "200px";
            var line = document.querySelector(".line");
            line.style.transform = "translate(".concat(e[3], "vw, ").concat(e[4], "vw) rotate(").concat(e[5], "deg)");
            line.style.width = "20vw";
        }
    });
};
// Game Logic
// music.play()
var boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(function (element) {
    var text = element.querySelector(".text");
    element.addEventListener("click", function () {
        if (text && text.innerText === "") {
            text.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText =
                    "Turn for " + turn;
            }
        }
    });
});
// Add onclick listener to reset button
var reset = document.getElementById("reset");
reset.addEventListener("click", function () {
    var texts = document.querySelectorAll(".text");
    Array.from(texts).forEach(function (element) {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width =
        "0px";
});
