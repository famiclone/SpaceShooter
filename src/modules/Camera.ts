// @ts-nocheck
import { Vector2D } from './Vector.js';

export class Camera {
  public speed: number;
  public pos: Vector2D;
  public vel: Vector2D;
  public size: Vector2D;

  constructor(x, y) {
    this.pos = new Vector2D(x, y);
    this.speed = 10;
  }

  update() {
    this.pos.set(
      this.pos.x + this.vel.x * this.speed,
      this.pos.y + this.vel.y * this.speed,
    );
  }
}
