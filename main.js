//variables
let audio = new Audio("assets/music.mp3");
let isPlaying = false;
const musicButton = document.querySelector("#music");

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

musicButton.addEventListener("click", toggleMusic);
