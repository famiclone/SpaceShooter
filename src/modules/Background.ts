import { checkBoundsCollide } from '../helpers'
import { Vec2 } from './Vec2'

class Star {
  public active: boolean
  vel: Vec2
  color: string

  constructor(public pos: Vec2, public speed: number = 1, public size) {
    this.active = true
    this.vel = new Vec2(0, 1)
    this.color = `rgba(255, 255, 255, ${this.speed / 2})`
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    const circle = new Path2D()
    circle.arc(this.pos.x, this.pos.y, this.size.x, 0, 2 * Math.PI)

    ctx.fill(circle)
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
    const random = Math.floor(Math.random() * Math.floor(10))
    const speed = random
    const size = new Vec2(2 / speed, 5 / speed)
    const position = new Vec2(Math.floor(Math.random() * ctx.canvas.width), 0)

    if (Math.round(Math.random() * 5) === 1) {
      this.stars.push(new Star(position, speed, size))
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
