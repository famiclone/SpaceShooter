// @ts-nocheck
import { Vector2D } from './Vector.js';

export class Sprite {
  img: HTMLImageElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  // sprite: HTMLImageElement

  constructor(
    public image,
    public name,
    public spritesheet,
    public size: Vector2D = new Vector2D(16, 16),
  ) {
    this.canvas = document.createElement('canvas');

    // Set canvas size
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;

    // Get context
    this.ctx = this.canvas.getContext('2d');

    const pos = this.getPosition();
    // Draw image on the canvas
    this.ctx.drawImage(
      this.image,
      pos.x,
      pos.y,
      this.size.x,
      this.size.y,
      0,
      0,
      this.size.x,
      this.size.y,
    );

    this.sprite = this.canvas;
  }

  private getPosition() {
    const el = this.spritesheet[this.name] || [0, 0];
    return new Vector2D(el[0], el[1]);
  }
}
