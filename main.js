//variables
let audio = new Audio("assets/music.mp3");
let isPlaying = false;
const container = document.querySelector(".gridContainer");
const musicButton = document.querySelector("#music");
const playButton = document.querySelector("#play");
const hsButton = document.querySelector("#highscores");
const cards = document.querySelectorAll(".memory-card");
const cardArray = [
  {
    name: "pepe-chill",
    img: "assets/cards/pepe-chill.gif",
  },
  {
    name: "pepe-clap",
    img: "assets/cards/pepe-clap.gif",
  },
  {
    name: "pepe-jam",
    img: "assets/cards/pepe-jam.gif",
  },
  {
    name: "pepe-poggers",
    img: "assets/cards/pepe-poggers.gif",
  },
  {
    name: "pepe-rich",
    img: "assets/cards/pepe-rich.gif",
  },
  {
    name: "pepe-sadge",
    img: "assets/cards/pepe-sadge.gif",
  },
  {
    name: "pepe-smile",
    img: "assets/cards/pepe-smile.gif",
  },
  {
    name: "pepe-wave",
    img: "assets/cards/pepe-wave.gif",
  },
];

// create board on load
document.addEventListener("DOMContentLoaded", () => {
  createBoard(16);
});
// function to play and pause music
const toggleMusic = () => {
  audio.volume = 0.1;
  audio.loop = true;
  isPlaying ? audio.pause() : audio.play();
};

audio.onplaying = function () {
  musicButton.style.color = "green";
  isPlaying = true;
};
audio.onpause = function () {
  musicButton.style.color = "red";
  isPlaying = false;
};

// create board
const createBoard = (n) => {
  for (let i = 1; i <= n; i++) {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    const frontCard = document.createElement("img");
    frontCard.classList.add("front-face");
    frontCard.setAttribute("src", "assets/pepewow.jpg");
    frontCard.setAttribute("alt", "name");
    const backCard = document.createElement("img");
    backCard.classList.add("back-face");
    backCard.setAttribute("src", "assets/pepe-sleeve.png");
    frontCard.setAttribute("alt", "pepe sleeve");
    card.appendChild(frontCard);
    card.appendChild(backCard);
    container.appendChild(card);
  }
};

// flip card
const flipCard = () => {
  console.log("Clicked");
  console.log(this);
};

cards.forEach((card) => card.addEventListener("click", flipCard));

console.log(cards);

// eventlistener to toggle music
musicButton.addEventListener("click", toggleMusic);
