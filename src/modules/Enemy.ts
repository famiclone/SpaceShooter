import { SpriteProps } from '../types'
import GameObject from './GameObject'
import { Sprite } from './Sprite'
import { Vec2 } from './Vec2'

class Enemy extends GameObject {
  vel: Vec2
  age: number

  constructor(ctx, pos, sprite: Sprite) {
    super(ctx, pos, sprite, new Vec2(16, 16))
    this.age = Math.floor(Math.random() * 128)
    this.pos.x = Math.round(
      ctx.canvas.width / 4 + (Math.random() * ctx.canvas.width) / 2
    )
    this.vel = new Vec2(0, 3)
  }

  explode() {
    this.active = false
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y / 2

    this.vel.x = 3 * Math.sin((this.age * Math.PI) / 64)

    this.age++

    this.active = this.active && this.isBounds()
  }
}

export default Enemy
