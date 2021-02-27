import Background from './Background'
import Player from './Player'
import UI from './UI'
import Enemy from './Enemy'

import playerSrc from '../images/player.png'
import enemySrc from '../images/enemy.png'
import { GameConfigProps, GameProps, Vec2Props } from '../types.js'

const config = {
  width: 320,
  height: 280
}

const level = {}

export default class Game implements GameProps {
  level: any
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  ui: HTMLDivElement
  enemies: any[]
  score: number
  bg: any
  player: any

  constructor(private config: GameConfigProps) {
    this.level = level
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.ui = document.createElement('div')
    this.ui.className = 'ui'
    this.initKeyboardController()
    document.querySelector('#screen').appendChild(this.canvas)
    document.querySelector('#screen').appendChild(this.ui)
    this.canvas.width = this.config.width
    this.canvas.height = this.config.height
    this.enemies = []
    this.score = 0
    this.bg = new Background(this.ctx, this.config)
    this.player = new Player(this.ctx, this.canvas.width / 2, this.canvas.height - 48, this.config, playerSrc)
  }

  initKeyboardController() {
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 87: // w
          this.player.y -= 32
          break
        case 65: // a
          this.player.x -= 32
          break
        case 83: // s
          this.player.y += 32
          break
        case 68: // d
          this.player.x += 32
          break
        case 32: // space
          this.player.shoot()
          break
      }
    })
  }

  isCollide(a: Vec2Props, b: Vec2Props) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
  }

  handleCollision() {
    this.player.playerBullets.map((bullet) => {
      this.enemies.map((enemy) => {
        if (this.isCollide(bullet, enemy)) {
          enemy.explode()
          this.score += 100
          bullet.active = false
        }
      })
    })

    this.enemies.map((enemy) => {
      if (this.isCollide(enemy, this.player)) {
        enemy.explode()
        this.player.explode()
      }
    })
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.bg.draw()
    this.player.draw()

    this.enemies.map((enemy) => {
      enemy.draw()
    })

    this.player.playerBullets.map((bullet) => {
      bullet.draw()
    })
  }

  update() {
    // Screen collision
    if (this.player.x + this.player.width > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.width
    }
    if (this.player.x < 0) {
      this.player.x = 0
    }
    if (this.player.y + this.player.height > this.canvas.height) {
      this.player.y = this.canvas.height - this.player.height
    }
    if (this.player.y < 0) {
      this.player.y = 0
    }

    this.ui.textContent = this.score.toString()

    this.handleCollision()

    this.player.playerBullets.map((bullet) => bullet.update())
    this.enemies.map((enemy) => enemy.update())

    this.bg.update()

    this.enemies = this.enemies.filter((enemy) => enemy.active)
    this.player.playerBullets = this.player.playerBullets.filter((bullet) => bullet.active)

    if (Math.round(Math.random() * 90) == 1) {
      this.enemies.push(new Enemy(this.ctx, 0, 0, this.config, enemySrc))
    }
  }

  run() {
    this.draw()
    this.update()

    requestAnimationFrame(() => this.run())
  }
}
