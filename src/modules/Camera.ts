import { Vec2D } from './Vec2D'

export class Camera {
  public speed: number
  public pos: Vec2D
  public vel: Vec2D
  public size: Vec2D

  constructor(x, y) {
    this.pos = new Vec2D(x, y)
    this.speed = 10
  }

  update() {
    this.pos.set(
      this.pos.x + this.vel.x * this.speed,
      this.pos.y + this.vel.y * this.speed
    )
  }
}
