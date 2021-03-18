import { checkBoundsCollide } from '../helpers'
import { Vec2D } from './Vec2D'

class Star {
  public active: boolean
  vel: Vec2D
  color: string

  constructor(public pos: Vec2D, public speed: number = 1, public size) {
    this.active = true
    this.vel = new Vec2D(0, 0)
    this.color = `rgba(255, 255, 255, ${this.speed / 2})`
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    const circle = new Path2D()
    circle.arc(this.pos.x, this.pos.y, this.size.x, 0, 2 * Math.PI)

    ctx.fill(circle)
  }

  update(vel) {
    this.pos.y += vel.y * this.speed
    this.pos.x += vel.x * this.speed
    this.active = this.active && checkBoundsCollide(this)
  }
}

export default class Background {
  color: string
  stars: any[]
  vel: Vec2D
  constructor() {
    this.color = 'black'
    this.stars = []
    this.vel = new Vec2D(0, 0)
  }

  drawStars(ctx) {
    const random = Math.floor(Math.random() * Math.floor(10))
    const speed = random
    const size = new Vec2D(2 / speed, 5 / speed)

    if (this.stars.length < 50 && Math.round(Math.random() * 5) === 1) {
      let position = new Vec2D(0, 0)

      // Camera move down
      if ((this.vel.y = -1)) {
        position = new Vec2D(
          Math.floor(Math.random() * ctx.canvas.width),
          ctx.canvas.height
        )
      }
      if ((this.vel.y = 1)) {
        position = new Vec2D(Math.floor(Math.random() * ctx.canvas.width), 0)
      }

      this.stars.push(new Star(position, speed, size))
    }
  }

  stop(d) {
    this.vel[d] = 0
  }

  draw(ctx) {
    // ctx.fillStyle = this.color
    // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    this.drawStars(ctx)
    this.stars.map((star) => {
      star.draw(ctx)
    })
  }

  update() {
    this.stars.map((star) => {
      star.update(this.vel)
    })

    this.stars = this.stars.filter((star) => star.active)
  }
}
