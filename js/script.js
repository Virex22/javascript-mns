(() => {
  // variable
  let movementInterval = null;
  let popup = document.getElementById("popup");
  let gameElement = {
    timeText: document.querySelector(".info-time"),
    duckpointText: document.querySelector(".info-duck-point"),
    hunterpointText: document.querySelector(".info-hunter-point"),
    duckImage: document.getElementById("duck"),
    bgImage: document.getElementById("bg"),
    buttonPlay: document.getElementById("button-play"),
    buttonStop: document.getElementById("stop-game"),
  };
  let game = {
    duckpoint: 0,
    hunterpoint: 0,
    secondPlayed: 0,
    secondDuckSurvive: 0,
    duckPos: {
      top: 0,
      left: 0,
    },
    control: {
      zPush: false,
      qPush: false,
      sPush: false,
      dPush: false,
    },
  };
  // code settings
  const gameTime = 2 * 60; // en secondes
  const speed = 10;
  // button play
  let buttonPlay = document.getElementById("button-play");
  buttonPlay.addEventListener("click", () => {
    console.log("game is playing");
    init();
    beginTimer();
    popup.style.display = "none";
    gameElement.buttonStop.style.display = "block";
    movementInterval = setInterval(gameloop, 10);
    refreshUI();
  });
  // button stop
  gameElement.buttonStop.addEventListener("click", () => {
    stop();
  });
  // initialisation
  function init() {
    game.duckpoint = game.hunterpoint = game.secondPlayed = 0;
  }

  // refresh UI
  function refreshUI() {
    gameElement.timeText.innerHTML = gameTime - game.secondPlayed;
    gameElement.hunterpointText.innerHTML = game.hunterpoint;
    gameElement.duckpointText.innerHTML = game.duckpoint;
  }

  // time function
  let interval = null;
  function beginTimer() {
    interval = setInterval(secondGameLoop, 1000);
  }
  function secondGameLoop() {
    game.secondPlayed++;
    if (game.secondPlayed >= gameTime) stop();
    gameElement.timeText.innerHTML = gameTime - game.secondPlayed;
    game.secondDuckSurvive++;
    console.log(game.secondDuckSurvive);
    if (game.secondDuckSurvive >= 10) {
      game.duckpoint++;
      game.secondDuckSurvive = 0;
      refreshUI();
    }
  }

  // stop function
  function stop() {
    popup.style.display = "flex";
    clearInterval(interval);
    clearInterval(movementInterval);
    gameElement.buttonPlay.innerText = "Rejouer";
    gameElement.buttonStop.style.display = "none";
    console.log("game is finish");
  }

  // duck click event

  gameElement.duckImage.addEventListener("click", () => {
    game.hunterpoint++;
    game.secondDuckSurvive = 0;
    refreshUI();
  });

  // control detection
  document.addEventListener("keydown", (event) => {
    let key = event.key;
    if (key == "z") game.control.zPush = true;
    if (key == "q") game.control.qPush = true;
    if (key == "s") game.control.sPush = true;
    if (key == "d") game.control.dPush = true;
  });
  document.addEventListener("keyup", (event) => {
    if (event.key == "z") game.control.zPush = false;
    if (event.key == "q") game.control.qPush = false;
    if (event.key == "s") game.control.sPush = false;
    if (event.key == "d") game.control.dPush = false;
  });
  function refreshDuckPos() {
    gameElement.duckImage.style.top = game.duckPos.top + "px";
    gameElement.duckImage.style.left = game.duckPos.left + "px";
  }
  // gameloop for movement
  function gameloop() {
    if (game.control.zPush) game.duckPos.top -= speed;
    if (game.control.qPush) game.duckPos.left -= speed;
    if (game.control.sPush) game.duckPos.top += speed;
    if (game.control.dPush) game.duckPos.left += speed;
    filterMovement();
    refreshDuckRotation();
    refreshDuckPos();
  }
  // movement constrain
  function filterMovement() {
    if (game.duckPos.top < 0) game.duckPos.top = 0;
    if (game.duckPos.top > 600 - gameElement.duckImage.offsetHeight) game.duckPos.top = 600 - gameElement.duckImage.offsetHeight;
    if (game.duckPos.left < 0) game.duckPos.left = 0;
    if (game.duckPos.left > gameElement.bgImage.offsetWidth - gameElement.duckImage.offsetWidth) game.duckPos.left = gameElement.bgImage.offsetWidth - gameElement.duckImage.offsetWidth;
  }
  // duck rotation
  function refreshDuckRotation() {
    if (game.control.zPush) gameElement.duckImage.style.transform = "rotate(-45deg)"; // haut
    if (game.control.qPush) gameElement.duckImage.style.transform = "rotate(235deg)"; // gauche
    if (game.control.sPush) gameElement.duckImage.style.transform = "rotate(150deg)"; // bas
    if (game.control.dPush) gameElement.duckImage.style.transform = "rotate(55deg)"; // droite
    if (game.control.dPush && game.control.sPush) gameElement.duckImage.style.transform = "rotate(95deg)"; // bas droit
    if (game.control.qPush && game.control.sPush) gameElement.duckImage.style.transform = "rotate(195deg)"; // bas gauche
    if (game.control.dPush && game.control.zPush) gameElement.duckImage.style.transform = "rotate(0deg)"; // haut droit
    if (game.control.qPush && game.control.zPush) gameElement.duckImage.style.transform = "rotate(275deg)"; // haut gauche
  }
})();
