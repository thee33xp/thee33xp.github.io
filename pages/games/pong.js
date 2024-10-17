// Canvas setup
const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Game variables
const paddleWidth = 10;
const paddleHeight = 80;
const ballRadius = 10;
let paddle1Y = canvas.height / 2 - paddleHeight / 2;
let paddle2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 11;
let ballSpeedY = 7;

let aiSpeed = 5;
let paddleSpeed = 8;
let isPaused = true;

// Score variables
let player1Score = 0;
let player2Score = 0;

// Paddle movement control
let moveUp = false;
let moveDown = false;

// Draw rectangle
function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

// Draw circle
function drawCircle(x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.closePath();
  context.fill();
}

// Draw text
function drawText(text, x, y, color) {
  context.fillStyle = color;
  context.font = '30px Arial';
  context.fillText(text, x, y);
}

// Update game state
function update() {
  if (isPaused) return;

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off top and bottom walls
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Check for collisions with paddles
  if (ballX - ballRadius < paddleWidth) {
    if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player2Score++;
      resetBall();
      
    }
  }
  
  if (ballX + ballRadius > canvas.width - paddleWidth) {
    if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    } else {
      player1Score++;
      resetBall();
    }
  }

  // Move paddle2 automatically (AI)
  if (paddle2Y + paddleHeight / 2 < ballY) {
    paddle2Y += aiSpeed;
  } else {
    paddle2Y -= aiSpeed;
  }

  // Move player paddle based on key press
  if (moveUp && paddle1Y > 0) {
    paddle1Y -= paddleSpeed;
  }
  if (moveDown && paddle1Y < canvas.height - paddleHeight) {
    paddle1Y += paddleSpeed;
  }
}

// Reset the ball to the center and adjust score
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

// Render everything
function render() {
  // Clear the canvas
  drawRect(0, 0, canvas.width, canvas.height, '#000');

  // Draw paddles
  drawRect(0, paddle1Y, paddleWidth, paddleHeight, '#FFF');
  drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, '#FFF');
  
  // Draw ball
  drawCircle(ballX, ballY, ballRadius, '#FFF');

  // Draw scores
  drawText(player1Score, canvas.width / 4, 50, '#FFF');
  drawText(player2Score, (3 * canvas.width) / 4, 50, '#FFF');
  
  // Draw pause message if paused
  if (isPaused) {
    
    drawText("Press SPACE to Play", canvas.width / 2 - 125, canvas.height / 2, '#FFF');
  }
}

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Control paddle1 with the arrow keys
window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      moveUp = true;
      event.preventDefault();
      break;
    case 'ArrowDown':
      moveDown = true;
      event.preventDefault();
      break;
    case ' ':
      isPaused = !isPaused;
      event.preventDefault();
      break;
  }
});

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      moveUp = false;
      break;
    case 'ArrowDown':
      moveDown = false;
      break;
  }
});