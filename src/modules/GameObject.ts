import { SpriteProps } from '../types'
import { Sprite } from './Sprite'
import { Vec2 } from './Vec2'

export default class GameObject {
  active: boolean
  canvas: HTMLCanvasElement
  image: HTMLImageElement
  vel: Vec2

  constructor(
    public ctx: CanvasRenderingContext2D,
    public pos: Vec2,
    public sprite: Sprite,
    public size: Vec2 = new Vec2(16, 16)
  ) {
    this.canvas = ctx.canvas
    this.image = new Image()
    this.pos = new Vec2(pos.x, pos.y)
    this.active = true
  }

  isBounds() {
    return (
      this.pos.x >= 0 &&
      this.pos.x <= this.canvas.width &&
      this.pos.y >= 0 &&
      this.pos.y <= this.canvas.height
    )
  }

  draw(ctx) {
    ctx.drawImage(this.sprite, this.pos.x, this.pos.y)
  }

  explode() {
    this.active = false
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y / 2
  }
}
