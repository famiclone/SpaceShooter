export default class Person {
  constructor(ctx, x, y, canvas) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.age = Math.floor(Math.random() * 128)
    this.xVelocity = 0
    this.yVelocity = 1
    this.width = 32
    this.height = 32
    this.active = true
    this.canvas = canvas
    this.inBounds = function () {
      return this.x >= 0 && this.x <= this.canvas.width && this.y >= 0 && this.y <= this.canvas.height
    }
  }

  draw() {
    //this.ctx.fillStyle = this.color;
    //this.ctx.fillRect(this.x, this.y, 32, 32);
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
  }

  explode() {
    this.active = false
  }

  update() {
    this.x += this.xVelocity
    this.y += this.yVelocity / 2

    this.xVelocity = 3 * Math.sin((this.age * Math.PI) / 64)

    this.age++

    this.active = this.active && this.inBounds()
  }
}
