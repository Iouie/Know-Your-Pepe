document.addEventListener("DOMContentLoaded", () => {
  //variables
  let audio = new Audio("assets/music.mp3");
  let isPlaying = false;
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let hsName = "";
  let matches = 0;
  const mainContainer = document.querySelector(".container");
  const container = document.querySelector(".gridContainer");
  const musicButton = document.querySelector("#music");
  const playButton = document.querySelector("#play");
  const winText = document.querySelector("#win");
  const mmButton = document.querySelector("#main-menu");
  const mainButtons = document.querySelector(".main-buttons");
  const hsButton = document.querySelector("#highscores");
  const getName = document.querySelector("#name");
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
  createBoard();
  container.style.display = "none"; // intialized to display nothing
  getName.style.display = "none";
  winText.style.display = "none";
  mmButton.style.display = "none";
  const cards = document.querySelectorAll(".memory-card");

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
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      for (let j = 0; j < 2; j++) {
        const card = document.createElement("div");
        card.classList.add("memory-card");
        const frontCard = document.createElement("img");
        frontCard.classList.add("front-face");
        frontCard.setAttribute("src", cardArray[i].img);
        frontCard.setAttribute("alt", cardArray[i].name);
        const backCard = document.createElement("img");
        backCard.classList.add("back-face");
        backCard.setAttribute("data-framework", cardArray[i].name);
        backCard.setAttribute("src", "assets/pepe-sleeve.png");
        frontCard.setAttribute("alt", "pepe sleeve");
        card.appendChild(frontCard);
        card.appendChild(backCard);
        container.appendChild(card);
      }
    }
  }

  // flip card
  const flipCard = (e) => {
    if (lockBoard) return;
    e.classList.toggle("flip");

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = e;

      return;
    } else {
      // second click
      hasFlippedCard = false;
      secondCard = e;
      checkForMatch();
    }
  };

  // function to check for match
  const checkForMatch = () => {
    // check if cards match
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
  };

  // function to disable card
  const disableCards = () => {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    matches++;

    // win condition
    if (matches === 8) {
      winText.style.display = "flex";
      container.style.display = "none";
      mmButton.style.display = "flex";
    }
    resetBoard();
  };

  // function to unflip cards
  const unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1000);
  };

  // function to reset board
  const resetBoard = () => {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
  };

  // select all container if a card is selcted call flipCard else do nothing
  container.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.className === "back-face") {
      flipCard(e.target);
    }
  });

  // shuffle cards  IIFE
  (function shuffle() {
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * 9);
      card.style.order = randomPos;
    });
  })();

  // eventlistener to toggle music
  musicButton.addEventListener("click", toggleMusic);

  // eventlistener for play button
  playButton.addEventListener("click", (e) => {
    e.preventDefault();
    getName.value = "";
    mainButtons.style.display = "none";
    getName.style.display = "flex";
  });

  // eventlistener to get name if enter is pressed
  getName.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (getName.value === "") return;
      hsName = getName.value;
      container.style.display = "flex";
      getName.style.display = "none";
    }
  });

  // eventlistener to go back to main menu
  mmButton.addEventListener("click", () => {
    mainContainer.style.display = "flex";
    mainButtons.style.display = "flex";
    winText.style.display = "none";
    mmButton.style.display = "none";
    resetBoard();
    container.innerHTML = "";
    createBoard();
    matches = 0;
  });
});
