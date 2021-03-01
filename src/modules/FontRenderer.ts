import { Sprite } from './Sprite'
import { Vec2 } from './Vec2'

export default class FontRenderer {
  image: HTMLImageElement

  constructor(
    public font: HTMLImageElement,
    public fontsheet: any,
    public size: Vec2 = new Vec2(8, 8)
  ) {}

  drawText(ctx, message, pos: Vec2 = new Vec2(0, 0)) {
    let xOffset: number = 0
    let yOffset: number = 0

    message.split('').forEach((char: string) => {
      const sprite = new Sprite(this.font, char, this.fontsheet, new Vec2(8, 8))

      ctx.drawImage(sprite.sprite, pos.x + xOffset, pos.y)
      xOffset += this.size.x
    })
  }
}
