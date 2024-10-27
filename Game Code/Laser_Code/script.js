let startTime, endTime, dotArenaDiv, dot, trials, count, overlay;
const maxTrialNumber = 4;
overlay = document.getElementById("gameStartOverlayId");

function getStartTime() {
  startTime = new Date().getTime();
}

function getEndTime() {
  endTime = new Date().getTime();
}

function calculateDifference() {
  return Math.abs((startTime - endTime) / 1000);
}

function generateRandomDot() {
  // Create a new div element
  dot = document.createElement("div");
  dot.className = "dot";
  dot.id = "dotId";

  // Get the dimensions of the 'danny' div
  dotArenaDiv = document.getElementById("dotArena");
  const dotArenaWidth = dotArenaDiv.clientWidth;
  const dotArenaHeight = dotArenaDiv.clientHeight;

  // Generate random x and y coordinates
  const x = Math.random() * (dotArenaWidth - 50); // Subtract dot width
  const y = Math.random() * (dotArenaHeight - 50); // Subtract dot height

  // Set the position of the dot
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  // Add the dot to the 'danny' div
  dotArenaDiv.appendChild(dot);
  getStartTime();
  document.getElementById("dotId").addEventListener("click", dotClick);
}

function dotClick() {
  //Paw animation
  let val;
  var paw = document.getElementById("pawId");

  paw.style.top = dot.style.top;
  paw.style.bottom = dot.style.bottom;
  paw.style.left = dot.style.left;
  paw.style.right = dot.style.right;

  paw.classList.add("paw");
  paw.style.visibility = "visible";

  setTimeout(() => {
    val = removeDot();
    paw.classList.remove("paw");
    setTimeout(() => {
      paw.style.visibility = "hidden";
    }, 700);
    trials.push(val);
    count++;
    console.log(count);
    if (count < maxTrialNumber) {
      setTimeout(() => {
        generateRandomDot();
      }, Math.floor(Math.random() * 3000));
    } else {
      gameOver();
    }
  }, 1000);
}
function removeDot() {
  getEndTime();
  let val = calculateDifference();
  console.log(val);
  dot.remove();
  return val;
}

function startGame() {
  overlay = document.getElementById("gameStartOverlayId");
  overlay.classList.remove("show");
  overlay.classList.add("hide");
  trials = [];
  count = 0;

  setTimeout(() => {
    overlay.remove();
    generateRandomDot();
  }, 2000);
}

function gameOver() {
  console.log(trials);
  document.getElementById("dotArena").appendChild(overlay);
  overlay.getElementsByTagName("h1")[0].innerHTML = "Game Over!";

  let sum = 0;
  for (const val of trials) {
    sum += val;
  }

  document.getElementById(
    "score"
  ).innerHTML = `Your average reaction time is ${(sum / maxTrialNumber).toFixed(
    2
  )} seconds`;
  overlay.getElementsByTagName("button")[0].innerHTML = "Play Again!";
  document.getElementById("gameStartOverlayId").classList.add("show");
}
