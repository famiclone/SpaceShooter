import { Vec2D } from './modules/Vec2D'

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
}

export interface GameProps {
  init(): void
  run(): void
  update(): void
  draw(): void
  initKeyboardController(): void
  isCollide(a: Vec2Props, b: Vec2Props): boolean
  handleCollision(): void
}

export interface PersonProps {
  update(): void
  draw(ctx: CanvasRenderingContext2D): void
  explode(): void
  isBounds(): void
}

export interface ScreenProps {
  mount(): void
  clear(): void
}

export interface SpriteProps {
  src: string
  pos: Vec2D
}
