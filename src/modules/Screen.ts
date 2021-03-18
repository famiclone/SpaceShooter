import { ScreenProps, SizeProps } from '../types'
import { Vec2D } from './Vec2D'

export default class Screen implements ScreenProps {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D

  constructor(public size: Vec2D = new Vec2D(255, 240)) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
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
