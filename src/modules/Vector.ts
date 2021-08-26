export class Vector2D {
  constructor(public x: number, public y: number) {}

  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  get(): Vector2D {
    return this;
  }
}
