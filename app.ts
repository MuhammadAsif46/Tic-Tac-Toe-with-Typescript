let music: HTMLAudioElement = new Audio("assets/music.mp3");
let audioTurn: HTMLAudioElement = new Audio("assets/ting.mp3");
let gameover: HTMLAudioElement = new Audio("assets/gameover.mp3");
let turn: string = "X";
let isgameover: boolean = false;

// Function to change the turn
const changeTurn = (): string => {
  return turn === "X" ? "0" : "X";
};

// Function to check for a win
const checkWin = (): void => {
  let text = document.getElementsByClassName(
    "text"
  ) as HTMLCollectionOf<HTMLElement>;
  let wins: number[][] = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      text[e[0]].innerText === text[e[1]].innerText &&
      text[e[2]].innerText === text[e[1]].innerText &&
      text[e[0]].innerText !== ""
    ) {
      const infoElement = document.querySelector(".info");
      if (infoElement) {
        infoElement.innerHTML = text[e[0]].innerText + " Won";
      }
      isgameover = true;
      const imgbox = document.querySelector(".imgbox");
      if (imgbox) {
        imgbox.getElementsByTagName("img")[0].style.width = "200px";
      }
      const line = document.querySelector(".line") as HTMLElement;
      if (line) {
        line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        line.style.width = "20vw";
      }
    }
  });
};

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let text = element.querySelector(".text") as HTMLElement | null;
  element.addEventListener("click", () => {
    if (text && text.innerText === "") {
      text.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        const infoElement = document.getElementsByClassName("info")[0] as HTMLElement;
        infoElement.innerHTML = "Turn for " + turn;
      }
    }
  });
});

// Add onclick listener to reset button
const reset = document.getElementById("reset") as HTMLElement;
reset.addEventListener("click", () => {
  let texts = document.querySelectorAll(".text");
  Array.from(texts).forEach((element) => {
    (element as HTMLElement).innerText = "";
  });
  turn = "X";
  isgameover = false;
  const line = document.querySelector(".line") as HTMLElement;
  if (line) {
    line.style.width = "0vw";
  }
  const infoElement = document.getElementsByClassName("info")[0] as HTMLElement;
  infoElement.innerHTML = "Turn for " + turn;
  const imgbox = document.querySelector(".imgbox");
  if (imgbox) {
    imgbox.getElementsByTagName("img")[0].style.width = "0px";
  }
});
