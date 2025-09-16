export interface Platform {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ground' | 'platform' | 'brick';
}

export class Level {
  public platforms: Platform[];

  constructor() {
    this.platforms = this.generateLevel();
  }

  private generateLevel(): Platform[] {
    const platforms: Platform[] = [];

    // Ground platforms
    for (let i = 0; i < 50; i++) {
      platforms.push({
        x: i * 64,
        y: window.innerHeight - 64,
        width: 64,
        height: 64,
        type: 'ground'
      });
    }

    // Floating platforms
    platforms.push(
      { x: 300, y: window.innerHeight - 200, width: 128, height: 32, type: 'platform' },
      { x: 500, y: window.innerHeight - 250, width: 128, height: 32, type: 'platform' },
      { x: 700, y: window.innerHeight - 180, width: 128, height: 32, type: 'platform' },
      { x: 900, y: window.innerHeight - 300, width: 128, height: 32, type: 'platform' },
      { x: 1100, y: window.innerHeight - 220, width: 128, height: 32, type: 'platform' },
      { x: 1300, y: window.innerHeight - 280, width: 128, height: 32, type: 'platform' },
    );

    // Brick blocks
    platforms.push(
      { x: 400, y: window.innerHeight - 320, width: 32, height: 32, type: 'brick' },
      { x: 432, y: window.innerHeight - 320, width: 32, height: 32, type: 'brick' },
      { x: 464, y: window.innerHeight - 320, width: 32, height: 32, type: 'brick' },
      { x: 800, y: window.innerHeight - 350, width: 32, height: 32, type: 'brick' },
      { x: 1000, y: window.innerHeight - 400, width: 32, height: 32, type: 'brick' },
    );

    // Gaps in ground
    platforms.splice(10, 2); // Remove some ground platforms to create gaps
    platforms.splice(20, 3);
    platforms.splice(30, 2);

    return platforms;
  }

  render(ctx: CanvasRenderingContext2D) {
    this.platforms.forEach(platform => {
      switch (platform.type) {
        case 'ground':
          ctx.fillStyle = '#8B4513'; // Brown
          ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
          // Add grass on top
          ctx.fillStyle = '#228B22'; // Green
          ctx.fillRect(platform.x, platform.y, platform.width, 8);
          break;
        
        case 'platform':
          ctx.fillStyle = '#654321'; // Dark brown
          ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
          // Add wood texture effect
          ctx.strokeStyle = '#4A4A4A';
          ctx.lineWidth = 1;
          for (let i = 0; i < platform.width; i += 16) {
            ctx.beginPath();
            ctx.moveTo(platform.x + i, platform.y);
            ctx.lineTo(platform.x + i, platform.y + platform.height);
            ctx.stroke();
          }
          break;
        
        case 'brick':
          ctx.fillStyle = '#CD853F'; // Sandy brown
          ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
          // Add brick outline
          ctx.strokeStyle = '#8B4513';
          ctx.lineWidth = 2;
          ctx.strokeRect(platform.x, platform.y, platform.width, platform.height);
          break;
      }
    });
  }
}