// @ts-nocheck
// import { SpriteProps } from '../types';
import { Sprite } from './Sprite.js';
import { Vector2D } from './Vector.js';

export default class GameObject {
  active: boolean;
  canvas: HTMLCanvasElement;
  image: HTMLImageElement;
  vel: Vector2D;

  constructor(
    public ctx: CanvasRenderingContext2D,
    public pos: Vector2D,
    public sprite: Sprite,
    public size: Vector2D = new Vector2D(16, 16),
  ) {
    this.canvas = ctx.canvas;
    this.image = new Image();
    this.pos = new Vector2D(pos.x, pos.y);
    this.active = true;
  }

  isBounds() {
    return (
      this.pos.x >= 0 &&
      this.pos.x <= this.canvas.width &&
      this.pos.y >= 0 &&
      this.pos.y <= this.canvas.height
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
  }

  explode() {
    this.active = false;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y / 2;
  }
}
