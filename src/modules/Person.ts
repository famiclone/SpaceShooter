import { PersonProps, Vec2Props } from '../types'
import { Vec2 } from './Vec2'

export default class Person implements PersonProps {
  age: number
  active: boolean
  canvas: HTMLCanvasElement
  image: HTMLImageElement

  constructor(
    public ctx: CanvasRenderingContext2D,
    public pos: Vec2,
    public imageSrc: string,
    public size: Vec2 = new Vec2(16, 16)
  ) {
    this.canvas = ctx.canvas
    this.age = Math.floor(Math.random() * 128)
    this.image = new Image()
    this.image.src = imageSrc
    this.pos = new Vec2(pos.x, pos.y)
    this.active = true

    console.log(imageSrc)
  }

  isBounds() {
    return this.pos.x >= 0 && this.pos.x <= this.canvas.width && this.pos.y >= 0 && this.pos.y <= this.canvas.height
  }

  draw(ctx) {
    // this.ctx.fillStyle = 'green'
    // this.ctx.fillRect(this.pos.x, this.pos.y, 32, 32)
    ctx.drawImage(this.image, this.pos.x, this.pos.y, this.size.x, this.size.y)
  }

  explode() {
    this.active = false
  }

  update() {
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y / 2
  }
}
