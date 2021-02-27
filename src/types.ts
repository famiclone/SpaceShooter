export interface SizeProps {
  width: number
  height: number
}

export interface GameConfigProps extends SizeProps {
  title: string
}

export interface Vec2Props {
  x: number
  y: number
  width: number
  height: number
}

export interface GameProps {
  run(): void
  update(): void
  draw(): void
  initKeyboardController(): void
  isCollide(a: Vec2Props, b: Vec2Props): boolean
  handleCollision(): void
}

export interface PersonProps {
  update(string): void
  draw(): void
  explode(): void
  isBounds(): void
}
