import { Vec2D } from './Vec2D'

export class Level {
  constructor(tileset, tilesetJson, level) {
    this.levelmap = level.map
    this.tilesetJson = tilesetJson
    this.image = tileset

    this.pos = new Vec2D(0, 0)
    this.size = new Vec2D(16, 16)
    this.vel = new Vec2D(0, 0)
    this.width = this.size.x * 16
    this.height = this.size.y * 16

    this.speed = 5
    console.log(level)
  }

  update() {
    this.pos.set(
      this.pos.x + this.vel.x * this.speed,
      this.pos.y + this.vel.y * this.speed
    )
  }

  moveUp() {
    this.vel.set(this.vel.x, 1)
  }
  moveRight() {
    this.vel.set(-1, this.vel.y)
  }

  moveDown() {
    this.vel.set(this.vel.x, -1)
  }
  moveLeft() {
    this.vel.set(1, this.vel.y)
  }
  stop(d) {
    this.vel[d] = 0
  }
  private getPosition(name) {
    const el = this.tilesetJson[name] || [0, 0]
    return new Vec2D(el[0], el[1])
  }

  draw(ctx) {
    this.levelmap.map((x, i) => {
      x.map((y, j) => {
        const tile = y === 0 ? 'lightgray' : 'gray'
        const pos = this.getPosition(y.toString())
        ctx.fillStyle = tile
        ctx.fillRect(
          this.pos.x + this.size.x * j,
          this.pos.y + this.size.y * i,
          this.size.x,
          this.size.y
        )
        ctx.drawImage(
          this.image,
          pos.x,
          pos.y,
          this.size.x,
          this.size.y,
          this.pos.x + this.size.x * j,
          this.pos.y + this.size.y * i,
          this.size.x,
          this.size.y
        )
      })
    })
  }
}
