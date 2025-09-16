import { CollisionDetector } from './CollisionDetector';

export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class Enemy {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public velocity: { x: number; y: number };
  private type: string;
  private animationFrame: number;
  private direction: number;

  constructor(x: number, y: number, type: string) {
    this.x = x;
    this.y = y;
    this.width = 28;
    this.height = 28;
    this.velocity = { x: -1, y: 0 };
    this.type = type;
    this.animationFrame = 0;
    this.direction = -1; // -1 for left, 1 for right
  }

  update(platforms: Platform[]) {
    // Simple AI: move back and forth
    this.velocity.x = this.direction * 1;

    // Apply gravity
    this.velocity.y += 0.8;

    // Update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Check platform collisions
    const collisionDetector = new CollisionDetector();
    let onGround = false;
    
    platforms.forEach(platform => {
      if (collisionDetector.checkCollision(this, platform)) {
        // Landing on top of platform
        if (this.velocity.y > 0 && this.y < platform.y) {
          this.y = platform.y - this.height;
          this.velocity.y = 0;
          onGround = true;
        }
        // Hitting platform from the side
        else if (Math.abs(this.velocity.x) > 0) {
          this.direction *= -1; // Change direction
        }
      }
    });

    // Change direction at edges (simple edge detection)
    if (!onGround) {
      this.direction *= -1;
    }

    // Update animation
    this.animationFrame = (this.animationFrame + 1) % 60;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.type === 'goomba') {
      // Body
      ctx.fillStyle = '#8B4513'; // Brown
      ctx.fillRect(this.x, this.y + 8, this.width, this.height - 8);

      // Head
      ctx.fillStyle = '#CD853F'; // Tan
      ctx.fillRect(this.x + 4, this.y, this.width - 8, 16);

      // Eyes
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x + 6, this.y + 4, 4, 4);
      ctx.fillRect(this.x + 18, this.y + 4, 4, 4);

      // Pupils
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x + 7, this.y + 5, 2, 2);
      ctx.fillRect(this.x + 19, this.y + 5, 2, 2);

      // Angry eyebrows
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x + 6, this.y + 2, 6, 2);
      ctx.fillRect(this.x + 16, this.y + 2, 6, 2);

      // Feet (animated)
      const footOffset = Math.sin(this.animationFrame * 0.3) * 2;
      ctx.fillStyle = '#654321';
      ctx.fillRect(this.x + 2, this.y + this.height - 4 + footOffset, 8, 4);
      ctx.fillRect(this.x + this.width - 10, this.y + this.height - 4 - footOffset, 8, 4);
    }
  }
}