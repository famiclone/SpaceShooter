export class Vec2D {
  constructor(public x: number, public y: number) {}

  set(x, y) {
    this.x = x
    this.y = y
  }

  get() {
    return {
      x: this.x,
      y: this.y
    }
  }
}
