import { Vec2 } from './Vec2'

export default class Bullet {
  public active: boolean
  pos: Vec2
  size: Vec2
  vel: Vec2

  constructor(x, y) {
    this.active = true
    this.pos = new Vec2(x, y)
    this.size = new Vec2(1, 3)
    this.vel = new Vec2(0, -5)
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
