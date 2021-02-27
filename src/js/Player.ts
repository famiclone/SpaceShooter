import Person from './Person'
import Bullet from './Bullet.js'

class Player extends Person {
  color: string
  width: number
  height: number
  active: boolean
  image: HTMLImageElement
  playerBullets: any[]

  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public config: any,
    public imageSrc: string
  ) {
    super(ctx, x, y)
    this.color = 'blue'
    this.width = 21
    this.height = 21
    this.active = true
    this.image = new Image()
    this.image.src = imageSrc
    this.playerBullets = []
  }

  // Bullet starts in the center of the player
  moveToMidpoint() {
    return {
      x: this.x + this.width / 2,
      y: this.y
    }
  }

  shoot() {
    let bulletPosition = this.moveToMidpoint()

    this.playerBullets.push(new Bullet(this.ctx, bulletPosition.x, bulletPosition.y, this.config))
  }

  explode() {
    this.active = false
  }
}

export default Player
