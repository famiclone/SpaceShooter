import Person from './Person'
import Bullet from './Bullet'
import { Vec2 } from './Vec2'

class Player extends Person {
  color: string
  width: number
  height: number
  active: boolean
  playerBullets: any[]
  vel: Vec2

  constructor(public ctx: CanvasRenderingContext2D, public pos: Vec2, public imageSrc: string) {
    super(ctx, pos, imageSrc, new Vec2(16, 16))
    this.color = 'blue'
    this.width = 21
    this.height = 21
    this.active = true
    this.playerBullets = []
    this.vel = new Vec2(0, 0)
  }

  // Bullet starts in the center of the player
  moveToMidpoint() {
    return {
      x: this.pos.x + this.size.x / 2,
      y: this.pos.y
    }
  }

  shoot() {
    let bulletPosition = this.moveToMidpoint()

    this.playerBullets.push(new Bullet(bulletPosition.x, bulletPosition.y))
  }

  explode() {
    this.active = false
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }
}

export default Player
