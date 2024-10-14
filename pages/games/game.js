// game.js
class Game {
    constructor() {
      this.canvas = document.getElementById('gameCanvas');
      this.ctx = this.canvas.getContext('2d');
      this.gameWidth = this.canvas.width;
      this.gameHeight = this.canvas.height;
  
      this.player = new Player(this.gameWidth, this.gameHeight);
      this.platforms = [
        new Platform(0, this.gameHeight - 20, this.gameWidth, 20),
        new Platform(200, this.gameHeight - 100, 100, 20),
      ];
  
      this.isGameRunning = true;
      this.init();
    }
  
    init() {
      this.gameLoop();
      this.addEventListeners();
    }
  
    gameLoop() {
      if (this.isGameRunning) {
        this.updateGame();
        this.drawGame();
        requestAnimationFrame(this.gameLoop.bind(this));
      }
    }
  
    updateGame() {
      this.player.update(this.platforms);
    }
  
    drawGame() {
      this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
      this.player.draw(this.ctx);
      this.platforms.forEach(platform => platform.draw(this.ctx));
      this.draw_Instructions()
    }
    draw_Instructions() {
      this.ctx.font = '20px Arial';
      this.ctx.fillStyle = 'Black';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Use the Arrow Keys to Move', this.gameWidth/2, 66)
    }
    addEventListeners() {
      document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight') this.player.keys.right = true;
        if (e.code === 'ArrowLeft') this.player.keys.left = true;
        if (e.code === 'ArrowUp') this.player.keys.jump = true; // Jump input
        e.preventDefault();
      });
  
      document.addEventListener('keyup', (e) => {
        if (e.code === 'ArrowRight') this.player.keys.right = false;
        if (e.code === 'ArrowLeft') this.player.keys.left = false;
        if (e.code === 'ArrowUp') this.player.keys.jump = false; // Stop jump input
      });
    }
  }
  
  class Player {
    constructor(gameWidth, gameHeight) {
      this.x = 50;
      this.y = gameHeight - 50; // Start near the bottom
      this.width = 30;
      this.height = 30;
      this.speedX = 0;
      this.speedY = 0; // Vertical speed
      this.jumpPower = -15; // Adjust this value for jump height
      this.gravity = 0.8; // Gravity to pull the player down
      this.grounded = false; // Is the player on the ground?
      this.keys = { right: false, left: false, jump: false };
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
    }
  
    update(platforms) {
      // Apply gravity only if the player is not grounded
      if (!this.grounded) {
        this.speedY += this.gravity; // Apply gravity
      }
      
      // Check for upward collision before moving the player
      if (this.speedY < 0) {
        // Check for collision with platforms above the player
        platforms.forEach(platform => {
          if (this.x < platform.x + platform.width &&
              this.x + this.width > platform.x &&
              this.y + this.speedY < platform.y + platform.height && // Check if the player is above the platform
              this.y > platform.y) { // Ensure player is falling towards the platform
            
            // Reset the player's position to just below the platform
            this.y = platform.y + platform.height; // Position the player just below the platform
            this.speedY = 0; // Reset vertical speed
          }
        });
      }
  
      // Update vertical position based on vertical speed
      this.y += this.speedY; // Update vertical position
  
      // Horizontal movement
      if (this.keys.right) this.x += 5;
      if (this.keys.left) this.x -= 5;
  
      // Jumping logic
      if (this.keys.jump && this.grounded) {
        this.speedY = this.jumpPower; // Set upward velocity
        this.grounded = false; // Set grounded to false
      }
  
      // Reset grounded status
      this.grounded = false;
  
      // Collision detection with platforms (downward collision check)
      platforms.forEach(platform => {
        // Check for collision when falling
        if (this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.y + this.height <= platform.y + this.speedY &&
            this.y + this.height + this.speedY >= platform.y) {
          
          // Reset player's position above the platform
          this.y = platform.y - this.height; // Position the player on top of the platform
          this.speedY = 0; // Reset vertical speed
          this.grounded = true; // Player is grounded
        }
      });
  
      // Keep the player within canvas bounds
      if (this.x < 0) this.x = 0;
      if (this.x + this.width > this.gameWidth) this.x = this.gameWidth - this.width;
  
      // Reset the player position if they fall below the bottom
      if (this.y > this.gameHeight) {
        this.y = this.gameHeight - this.height;
        this.speedY = 0; // Reset vertical speed when falling
        this.grounded = true; // Ensure the player is considered grounded
      }
    }
  
    draw(ctx) {
      ctx.fillStyle = 'blue';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  
  
  class Platform {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    draw(ctx) {
      ctx.fillStyle = 'green';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  
  window.onload = () => {
    new Game(); // Start the game when the window loads
  };
  