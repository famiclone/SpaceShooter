import { Sprite } from './Sprite'
import { Vec2D } from './Vec2D'

export default class FontRenderer {
  image: HTMLImageElement

  constructor(
    public font: HTMLImageElement,
    public fontsheet: any,
    public position: Vec2D = new Vec2D(0, 0),
    public size: Vec2D = new Vec2D(8, 8)
  ) {}

  private getPosition(name) {
    const el = this.fontsheet[name] || [0, 0]
    return new Vec2D(el[0], el[1])
  }

  drawText(ctx, message, position: Vec2D = new Vec2D(0, 0)) {
    let xOffset: number = 0
    let yOffset: number = 0

    message.split('').forEach((char: string) => {
      const pos = this.getPosition(char)
      ctx.drawImage(
        this.font,
        pos.x,
        pos.y,
        this.size.x,
        this.size.y,
        position.x + this.position.x + xOffset,
        position.y + this.position.y,
        this.size.x,
        this.size.y
      )
      xOffset += this.size.x
    })
  }
}
