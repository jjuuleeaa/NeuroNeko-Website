// Game State Variables
let level = 1;
let health = 3;

// Cat Colors and Images Array
const catColors = [
  { color: "black", image: "./cat-images/black-cat.png" },
  { color: "gray", image: "./cat-images/gray-cat.png" },
  { color: "orange", image: "./cat-images/orange-cat.png" },
  { color: "tabby", image: "./cat-images/tabby-cat.png" },
  { color: "white", image: "./cat-images/white-cat.png" },
];

let currentCat; // Holds the current cat object for each level

// Start the game: Hide welcome screen, show game area
function startGame() {
  document.getElementById("welcome-screen").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  loadLevel();
}

// Load each level: Randomize cat color and display it
function loadLevel() {
  document.getElementById("level").innerText = level;

  // Get a random cat from the array
  let randomIndex = Math.floor(Math.random() * catColors.length);
  currentCat = catColors[randomIndex];

  // Display the cat image
  let catContainer = document.getElementById("cat-container");
  catContainer.innerHTML = `<img src="${currentCat.image}" alt="${currentCat.color} cat" width="150">`;

  // Hide the cat after 10 seconds
  setTimeout(() => {
    catContainer.innerHTML = "";
    const answerSection = document.getElementById("answer-section");
    if (answerSection) answerSection.style.display = "block";
  }, 3000 * Math.pow(0.85, level)); // 10 seconds
}

// Check if the answer is correct
function checkAnswer() {
  let userAnswer = document.getElementById("cat-answer").value.toLowerCase();
  if (userAnswer === currentCat.color) {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("success-screen").style.display = "block";
  } else {
    health--;
    updateHealthBar();
    if (health > 0) {
      document.getElementById("game-area").style.display = "none";
      document.getElementById("fail-screen").style.display = "block";
    } else {
      alert("Game Over! Try again.");
      restartGame();
    }
  }
}

// Move to the next level
function nextLevel() {
  level++;
  document.getElementById("success-screen").classList.add("fade-out");
  setTimeout(() => {
    document.getElementById("success-screen").classList.remove("fade-out");
    document.getElementById("success-screen").style.display = "none";
    document.getElementById("game-area").classList.add("fade-in");
    document.getElementById("game-area").style.display = "block";
    document.getElementById("answer-section").style.display = "none";
    document.getElementById("cat-answer").value = "";
    loadLevel();
  }, 1000); // Wait for the fade-out animation to finish
}

// Restart the game
function restartGame() {
  level = 1;
  health = 3;
  updateHealthBar();
  document.getElementById("fail-screen").style.display = "none";
  document.getElementById("game-area").style.display = "block";
  document.getElementById("answer-section").style.display = "none";
  document.getElementById("cat-answer").value = "";
  loadLevel();
}

// Update the health bar based on player's current health
function updateHealthBar() {
  const healthIndicator = document.getElementById("health-indicator");
  let healthPercentage = (health / 3) * 100;
  healthIndicator.style.width = healthPercentage + "%";

  // Change the color of the health bar based on health level
  if (health === 2) {
    healthIndicator.style.backgroundColor = "yellow";
  } else if (health === 1) {
    healthIndicator.style.backgroundColor = "red";
  }
}

// Additional Features: Shake effect for wrong answers
function checkAnswerWithShake() {
  let userAnswer = document.getElementById("cat-answer").value.toLowerCase();
  if (userAnswer === currentCat.color) {
    document.getElementById("game-area").style.display = "none";
    document.getElementById("success-screen").style.display = "block";
  } else {
    // Add shake animation when the answer is wrong
    document.getElementById("cat-answer").classList.add("shake");
    setTimeout(() => {
      document.getElementById("cat-answer").classList.remove("shake");
    }, 500); // Shake effect for 0.5s

    health--;
    updateHealthBar();
    if (health > 0) {
      document.getElementById("game-area").style.display = "none";
      document.getElementById("fail-screen").style.display = "block";
    } else {
      alert("Game Over! Try again.");
      restartGame();
    }
  }
}
