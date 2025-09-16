import { CollisionDetector } from './CollisionDetector';

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Player {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public velocity: { x: number; y: number };
  private onGround: boolean;
  private animationFrame: number;
  private direction: 'left' | 'right';

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;
    this.velocity = { x: 0, y: 0 };
    this.onGround = false;
    this.animationFrame = 0;
    this.direction = 'right';
  }

  update(inputManager: any, platforms: Platform[]) {
    // Handle input
    if (inputManager.isKeyPressed('ArrowLeft')) {
      this.velocity.x = -5;
      this.direction = 'left';
    } else if (inputManager.isKeyPressed('ArrowRight')) {
      this.velocity.x = 5;
      this.direction = 'right';
    } else {
      this.velocity.x *= 0.8; // Friction
    }

    // Jumping
    if (inputManager.isKeyPressed('Space') && this.onGround) {
      this.velocity.y = -18;
      this.onGround = false;
    }

    // Apply gravity
    this.velocity.y += 0.8;

    // Update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Check platform collisions
    this.onGround = false;
    const collisionDetector = new CollisionDetector();
    
    platforms.forEach(platform => {
      if (collisionDetector.checkCollision(this, platform)) {
        // Landing on top of platform
        if (this.velocity.y > 0 && this.y < platform.y) {
          this.y = platform.y - this.height;
          this.velocity.y = 0;
          this.onGround = true;
        }
        // Hitting platform from below
        else if (this.velocity.y < 0 && this.y > platform.y) {
          this.y = platform.y + platform.height;
          this.velocity.y = 0;
        }
        // Hitting platform from the side
        else if (Math.abs(this.velocity.x) > 0) {
          if (this.x < platform.x) {
            this.x = platform.x - this.width;
          } else {
            this.x = platform.x + platform.width;
          }
          this.velocity.x = 0;
        }
      }
    });

    // Update animation
    if (Math.abs(this.velocity.x) > 0.1) {
      this.animationFrame = (this.animationFrame + 1) % 20;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    // Body
    ctx.fillStyle = '#FF6B6B'; // Red
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Hat
    ctx.fillStyle = '#FF0000'; // Bright red
    ctx.fillRect(this.x + 4, this.y - 8, this.width - 8, 12);

    // Eyes
    ctx.fillStyle = 'white';
    if (this.direction === 'right') {
      ctx.fillRect(this.x + 8, this.y + 8, 6, 6);
      ctx.fillRect(this.x + 18, this.y + 8, 6, 6);
    } else {
      ctx.fillRect(this.x + 8, this.y + 8, 6, 6);
      ctx.fillRect(this.x + 18, this.y + 8, 6, 6);
    }

    // Pupils
    ctx.fillStyle = 'black';
    if (this.direction === 'right') {
      ctx.fillRect(this.x + 12, this.y + 10, 2, 2);
      ctx.fillRect(this.x + 22, this.y + 10, 2, 2);
    } else {
      ctx.fillRect(this.x + 8, this.y + 10, 2, 2);
      ctx.fillRect(this.x + 18, this.y + 10, 2, 2);
    }

    // Mustache
    ctx.fillStyle = '#8B4513'; // Brown
    ctx.fillRect(this.x + 10, this.y + 16, 12, 4);

    // Animation effect for walking
    if (Math.abs(this.velocity.x) > 0.1) {
      const bounce = Math.sin(this.animationFrame * 0.5) * 2;
      ctx.save();
      ctx.translate(0, bounce);
      // Redraw with bounce effect
      ctx.restore();
    }
  }
}