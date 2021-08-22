import { ScreenProps, SizeProps } from '../types.js';
import { Vector2D } from './Vector.js';

export default class Screen implements ScreenProps {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(
    public size: Vector2D = new Vector2D(255, 240),
    htmlId: string = 'screen',
  ) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = htmlId;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.size.x;
    this.canvas.height = this.size.y;
    this.mount();
  }

  clear() {
    if (this.ctx) {
      this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    }
  }

  mount() {
    const appContianer = document.querySelector('#app');
    if (appContianer) {
      appContianer.append(this.canvas);
    }
  }
}
