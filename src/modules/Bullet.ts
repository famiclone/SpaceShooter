// @ts-nocheck
import { Vector2D } from './Vector.js';

export default class Bullet {
  public active: boolean;
  pos: Vector2D;
  size: Vector2D;
  vel: Vector2D;

  constructor(x, y) {
    this.active = true;
    this.pos = new Vector2D(x, y);
    this.size = new Vector2D(1, 3);
    this.vel = new Vector2D(0, -5);
  }

  draw(ctx) {
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y + 3);
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}
