import { checkBoundsCollide } from '../helpers'
import GameObject from './GameObject'
import { Vec2 } from './Vec2'

class Star {
  public active: boolean
  vel: Vec2
  color: string

  constructor(public pos: Vec2, public speed: number = 1) {
    this.active = true
    this.vel = new Vec2(0, 1)
    this.color = `rgba(255, 255, 255, ${this.speed / 5})`
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.pos.x, this.pos.y, 3, 3)
  }

  update() {
    this.pos.y += this.vel.y * this.speed
    this.active = this.active && checkBoundsCollide(this)
  }
}

export default class Background {
  color: string
  stars: any[]
  constructor() {
    this.color = 'black'
    this.stars = []
  }

  drawStars(ctx) {
    const random = Math.random()
    const speed = (random > 0.7 ? 0.7 : random > 0.5 ? 0.5 : 0.3) * 5
    const position = new Vec2(Math.floor(Math.random() * ctx.canvas.width), 0)

    if (Math.round(Math.random() * 5) === 1) {
      this.stars.push(new Star(position, speed))
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.drawStars(ctx)
    this.stars.map((star) => {
      star.draw(ctx)
    })
  }

  update() {
    this.stars.map((star) => {
      star.update()
    })

    this.stars = this.stars.filter((star) => star.active)
  }
}
