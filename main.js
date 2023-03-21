document.addEventListener("DOMContentLoaded", () => {
  //variables
  let audio = new Audio("assets/music.mp3");
  let isPlaying = false;
  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  const container = document.querySelector(".gridContainer");
  const musicButton = document.querySelector("#music");
  const playButton = document.querySelector("#play");
  const hsButton = document.querySelector("#highscores");
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

  // const memoryCard = document.querySelectorAll(".memory-card");

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
  };

  // function to unflip cards
  const unflipCards = () => {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      lockBoard = false;
    }, 1500);
  };

  // select all container if a card is selcted call flipCard else do nothing
  container.addEventListener("click", (e) => {
    if (e.target.className === "back-face") {
      flipCard(e.target);
    }
  });

  // eventlistener to toggle music
  musicButton.addEventListener("click", toggleMusic);
});
