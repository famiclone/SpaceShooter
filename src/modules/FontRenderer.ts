import { Sprite } from './Sprite'
import { Vec2 } from './Vec2'

export default class FontRenderer {
  image: HTMLImageElement

  constructor(public fontSrc: string, public fontsheet: any) {
    this.image = new Image()
    this.image.src = fontSrc
  }

  drawText(ctx, message, pos: Vec2 = new Vec2(0, 0)) {
    const letter = new Sprite(this.image, message[0], this.fontsheet)

    ctx.drawImage(letter.image, pos.x, pos.y)
  }
}
