//@ts-nocheck
import { Sprite } from './Sprite.js';
import { Vector2D } from './Vector.js';

export default class FontRenderer {
  image: HTMLImageElement;

  constructor(
    public font: HTMLImageElement,
    public fontsheet: any,
    public position: Vector2D = new Vector2D(0, 0),
    public size: Vector2D = new Vector2D(8, 8),
  ) {}

  private getPosition(name) {
    const el = this.fontsheet[name] || [0, 0];
    return new Vector2D(el[0], el[1]);
  }

  drawText(ctx, message, position: Vector2D = new Vector2D(0, 0)) {
    let xOffset: number = 0;
    let yOffset: number = 0;

    message.split('').forEach((char: string) => {
      const pos = this.getPosition(char);
      ctx.drawImage(
        this.font,
        pos.x,
        pos.y,
        this.size.x,
        this.size.y,
        position.x + this.position.x + xOffset,
        position.y + this.position.y,
        this.size.x,
        this.size.y,
      );
      xOffset += this.size.x;
    });
  }
}
