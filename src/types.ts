import { Vector2D } from './modules/Vector.js';

export interface SizeProps {
  width: number;
  height: number;
}

export type ObjectType = { [key: string]: any };

export enum LevelImgMap {
  '#000000', // EMPTY
  '#ffffff', // BLOCK
  '#ff0000', // BLOCK_RED
  '#00ff00', // BLOCK_TERM
}

export interface GameConfigProps extends SizeProps {
  title: string;
}

export interface Vector2Props {
  x: number;
  y: number;
}

export interface GameProps {
  init(): void;
  run(): void;
  update(): void;
  draw(): void;
  initKeyboardController(): void;
  isCollide(a: Vector2Props, b: Vector2Props): boolean;
  handleCollision(): void;
}

export interface PersonProps {
  update(): void;
  draw(ctx: CanvasRenderingContext2D): void;
  explode(): void;
  isBounds(): void;
}

export interface ScreenProps {
  mount(): void;
  clear(): void;
}

export interface SpriteProps {
  src: string;
  pos: Vector2D;
}
