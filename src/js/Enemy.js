import Person from './Person.js'

class Enemy extends Person {
  constructor(ctx, x, y, config, imageSrc) {
    super(ctx, x, y, ctx.canvas)
    this.color = 'red'
    this.image = new Image()
    this.image.src = imageSrc
    this.x = Math.round(ctx.canvas.width / 4 + (Math.random() * ctx.canvas.width) / 2)
    this.yVelocity = 3
    this.width = 16
    this.height = 16
  }

  explode() {
    this.active = false
  }
}

export default Enemy
