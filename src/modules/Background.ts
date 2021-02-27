class Star {
  constructor() {
    this.active = true
    this.x = Math.floor(Math.random() * this.canvas.width)
    this.y = 0
    // this.dest = Math.random()
    this.dest = 0.5
    this.color = `rgba(255, 255, 255, ${this.dest})`
    this.xVelocity = 0
    this.yVelocity = this.dest > 0.7 ? 1 : this.dest > 0.5 ? 0.5 : 0.25
    this.active = true
    this.speed = 20

    this.inBounds = function () {
      return this.x >= 0 && this.x <= this.canvas.width && this.y >= 0 && this.y <= this.canvas.height
    }
  }

  draw(screen) {
    screen.ctx.fillStyle = this.color
    screen.ctx.fillRect(this.x, this.y, 3, 3)
  }

  update() {
    this.y += this.yVelocity * this.speed
    this.active = this.active && this.inBounds()
  }
}

export default class Background {
  color: string
  stars: any[]
  constructor() {
    this.color = 'black'
    this.stars = []
  }

  drawStars() {
    if (Math.round(Math.random() * 5) == 1) {
      this.stars.push(new Star())
    }
  }

  draw(screen) {
    screen.ctx.fillStyle = this.color
    screen.ctx.fillRect(0, 0, screen.width, screen.height)

    this.drawStars()
    this.stars.map((star) => {
      star.draw()
    })
  }

  update() {
    this.stars.map((star) => {
      star.update()
    })

    this.stars = this.stars.filter((star) => star.active)
  }
}
