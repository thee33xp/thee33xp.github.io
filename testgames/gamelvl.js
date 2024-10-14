// Game Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let currentLevel = 0;
let enemies = [];
let player;
let gameRunning = false;

// Level Data
const levels = [
  { enemyCount: 5, enemySpeed: 1 },
  { enemyCount: 10, enemySpeed: 1.5 },
  { enemyCount: 15, enemySpeed: 2 },
  // Add more levels here
];

// Initialize Player
function initPlayer() {
  player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 20,
    height: 20,
    color: 'blue'
  };
}

// Initialize Enemies for Current Level
function initEnemies() {
  enemies = [];
  const levelData = levels[currentLevel];
  for (let i = 0; i < levelData.enemyCount; i++) {
    enemies.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height / 2,
      width: 20,
      height: 20,
      color: 'red',
      speed: levelData.enemySpeed
    });
  }
}

// Check Level Completion
function checkLevelCompletion() {
  if (enemies.length === 0) {
    currentLevel++;
    if (currentLevel < levels.length) {
      startLevel();
    } else {
      gameRunning = false;
      alert("You've completed all levels!");
    }
  }
}

// Start Level
function startLevel() {
  initPlayer();
  initEnemies();
  gameRunning = true;
  gameLoop();
}

// Game Loop
function gameLoop() {
  if (!gameRunning) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  updateAndDrawEnemies();
  checkLevelCompletion();
  
  requestAnimationFrame(gameLoop);
}

// Draw Player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Update and Draw Enemies
function updateAndDrawEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    let enemy = enemies[i];
    enemy.y += enemy.speed;
    
    // Remove enemy if off-screen
    if (enemy.y > canvas.height) {
      enemies.splice(i, 1);
      i--;
      continue;
    }
    
    // Draw enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
}

// Start Game
startLevel();