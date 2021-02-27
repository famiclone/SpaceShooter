import { PersonProps } from '../types'

export default class Person implements PersonProps {
  age: number
  xVelocity: number
  yVelocity: number
  width: number
  height: number
  active: boolean
  image: HTMLImageElement
  canvas: HTMLCanvasElement

  constructor(public ctx: CanvasRenderingContext2D, public x: number, public y: number) {
    this.canvas = ctx.canvas
    this.age = Math.floor(Math.random() * 128)
    this.xVelocity = 0
    this.yVelocity = 1
    this.width = 32
    this.height = 32
    this.active = true
  }

  isBounds() {
    return this.x >= 0 && this.x <= this.canvas.width && this.y >= 0 && this.y <= this.canvas.height
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

    this.active = this.active && this.isBounds()
  }
}
