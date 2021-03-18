import GameObject from './GameObject'
import Bullet from './Bullet'
import { Vec2D } from './Vec2D'
import { SpriteProps } from '../types'
import { Sprite } from './Sprite'

class Player extends GameObject {
  color: string
  width: number
  height: number
  active: boolean
  playerBullets: any[]
  vel: Vec2D

  constructor(
    public ctx: CanvasRenderingContext2D,
    public pos: Vec2D = new Vec2D(0, 0),
    public sprite: Sprite,
    public speed: number = 2
  ) {
    super(ctx, pos, sprite, new Vec2D(16, 16))
    this.active = true
    this.playerBullets = []
    this.vel = new Vec2D(0, 0)
  }

  // Bullet starts in the center of the player
  moveToMidpoint() {
    return {
      x: this.pos.x + 2,
      y: this.pos.y
    }
  }

  moveUp() {
    this.vel.set(this.vel.x, -1)
  }
  moveRight() {
    this.vel.set(1, this.vel.y)
  }

  moveDown() {
    this.vel.set(this.vel.x, 1)
  }
  moveLeft() {
    this.vel.set(-1, this.vel.y)
  }

  stop(d) {
    this.vel[d] = 0
  }

  shoot() {
    let bulletPosition = this.moveToMidpoint()

    this.playerBullets.push(new Bullet(bulletPosition.x, bulletPosition.y))
    this.playerBullets.push(new Bullet(bulletPosition.x + 11, bulletPosition.y))
  }

  explode() {
    this.active = false
  }

  update() {
    this.pos.set(
      this.pos.x + this.vel.x * this.speed,
      this.pos.y + this.vel.y * this.speed
    )
  }
}

export default Player
