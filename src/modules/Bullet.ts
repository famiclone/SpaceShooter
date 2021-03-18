import { Vec2D } from './Vec2D'

export default class Bullet {
  public active: boolean
  pos: Vec2D
  size: Vec2D
  vel: Vec2D

  constructor(x, y) {
    this.active = true
    this.pos = new Vec2D(x, y)
    this.size = new Vec2D(1, 3)
    this.vel = new Vec2D(0, -5)
  }

  draw(ctx) {
    ctx.fillStyle = 'orange'
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y + 3)
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }
}
