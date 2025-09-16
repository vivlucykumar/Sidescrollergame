import { Player } from './Player';
import { Level } from './Level';
import { Enemy } from './Enemy';
import { InputManager } from './InputManager';
import { CollisionDetector } from './CollisionDetector';

export type GameState = 'menu' | 'playing' | 'gameOver';

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private level: Level;
  private enemies: Enemy[];
  public inputManager: InputManager;
  private collisionDetector: CollisionDetector;
  private camera: { x: number; y: number };
  private gameState: GameState;
  private score: number;
  private lives: number;
  private animationId: number | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.setupCanvas();
    
    this.inputManager = new InputManager();
    this.collisionDetector = new CollisionDetector();
    this.camera = { x: 0, y: 0 };
    this.gameState = 'playing';
    this.score = 0;
    this.lives = 3;
    this.animationId = null;

    this.initializeGame();
  }

  private setupCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  private initializeGame() {
    this.level = new Level();
    this.player = new Player(100, this.canvas.height - 200);
    this.enemies = [
      new Enemy(400, this.canvas.height - 150, 'goomba'),
      new Enemy(800, this.canvas.height - 150, 'goomba'),
      new Enemy(1200, this.canvas.height - 150, 'goomba'),
    ];
  }

  public start() {
    this.gameLoop();
  }

  public stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  public restart() {
    this.gameState = 'playing';
    this.score = 0;
    this.lives = 3;
    this.initializeGame();
    this.updateUI();
    const gameOverScreen = document.getElementById('gameOverScreen');
    if (gameOverScreen) {
      gameOverScreen.style.display = 'none';
    }
  }

  private gameLoop = () => {
    this.update();
    this.render();
    this.animationId = requestAnimationFrame(this.gameLoop);
  };

  private update() {
    if (this.gameState !== 'playing') return;

    // Update player
    this.player.update(this.inputManager, this.level.platforms);

    // Update enemies
    this.enemies.forEach(enemy => {
      enemy.update(this.level.platforms);
    });

    // Update camera to follow player
    this.camera.x = this.player.x - this.canvas.width / 2;
    this.camera.y = 0;

    // Check collisions
    this.checkCollisions();

    // Check if player fell off the world
    if (this.player.y > this.canvas.height + 100) {
      this.lives--;
      if (this.lives <= 0) {
        this.gameOver();
      } else {
        this.respawnPlayer();
      }
    }

    this.updateUI();
  }

  private checkCollisions() {
    // Player vs enemies
    this.enemies.forEach((enemy, index) => {
      if (this.collisionDetector.checkCollision(this.player, enemy)) {
        if (this.player.velocity.y > 0 && this.player.y < enemy.y) {
          // Player jumped on enemy
          this.enemies.splice(index, 1);
          this.player.velocity.y = -15; // Bounce
          this.score += 100;
        } else {
          // Player hit enemy
          this.lives--;
          if (this.lives <= 0) {
            this.gameOver();
          } else {
            this.respawnPlayer();
          }
        }
      }
    });
  }

  private respawnPlayer() {
    this.player.x = 100;
    this.player.y = this.canvas.height - 200;
    this.player.velocity = { x: 0, y: 0 };
  }

  private gameOver() {
    this.gameState = 'gameOver';
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScore = document.getElementById('finalScore');
    if (gameOverScreen && finalScore) {
      finalScore.textContent = this.score.toString();
      gameOverScreen.style.display = 'flex';
    }
  }

  private updateUI() {
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    if (scoreElement) scoreElement.textContent = this.score.toString();
    if (livesElement) livesElement.textContent = this.lives.toString();
  }

  private render() {
    // Clear canvas
    this.ctx.fillStyle = '#87CEEB'; // Sky blue
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Save context for camera transform
    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Render level
    this.level.render(this.ctx);

    // Render enemies
    this.enemies.forEach(enemy => {
      enemy.render(this.ctx);
    });

    // Render player
    this.player.render(this.ctx);

    // Restore context
    this.ctx.restore();

    // Render clouds (parallax background)
    this.renderClouds();
  }

  private renderClouds() {
    this.ctx.fillStyle = 'white';
    const cloudOffset = this.camera.x * 0.5; // Parallax effect
    
    for (let i = 0; i < 5; i++) {
      const x = (i * 300 - cloudOffset) % (this.canvas.width + 200);
      const y = 50 + (i % 3) * 30;
      this.renderCloud(x, y);
    }
  }

  private renderCloud(x: number, y: number) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, 0, Math.PI * 2);
    this.ctx.arc(x + 25, y, 30, 0, Math.PI * 2);
    this.ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
    this.ctx.fill();
  }
}