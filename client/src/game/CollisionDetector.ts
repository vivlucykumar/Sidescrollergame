export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class CollisionDetector {
  public checkCollision(obj1: GameObject, obj2: GameObject): boolean {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  }

  public checkPointInRect(pointX: number, pointY: number, rect: GameObject): boolean {
    return (
      pointX >= rect.x &&
      pointX <= rect.x + rect.width &&
      pointY >= rect.y &&
      pointY <= rect.y + rect.height
    );
  }
}