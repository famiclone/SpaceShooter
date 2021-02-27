import { ScreenProps, SizeProps } from '../types'
import { Vec2 } from './Vec2'

export default class Screen implements ScreenProps {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  size: Vec2

  constructor(size: Vec2) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.size = new Vec2(size.x, size.y)
    this.canvas.width = this.size.x
    this.canvas.height = this.size.y
  }

  clear() {
    this.ctx.clearRect(0, 0, this.size.x, this.size.y)
  }

  mount() {
    const container: HTMLDivElement = document.createElement('div')
    container.setAttribute('id', 'screen')
    container.append(this.canvas)
    document.body.append(container)
  }
}
