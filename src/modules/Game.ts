import Background from './Background'
import Player from './Player'
import UI from './UI'
import Screen from './Screen'
import Enemy from './Enemy'
import { GameConfigProps } from '../types'
import { checkBoundsCollide } from '../helpers'

import playerSrc from '../images/player.png'
import enemySrc from '../images/enemy.png'
import { Vec2 } from './Vec2'

const level = {}

export default class Game {
  screen: Screen
  level: any
  ui: HTMLDivElement
  enemies: Enemy[]
  score: number
  bg: any
  player: Player

  constructor(private config: GameConfigProps) {
    this.level = level
    this.ui = document.createElement('div')
    this.screen = new Screen(new Vec2(config.width, config.height))
    this.ui.className = 'ui'
    this.initKeyboardController()
    this.enemies = []
    this.score = 0
    this.bg = new Background()
    this.player = new Player(
      this.screen.ctx,
      new Vec2(this.screen.size.x / 2, this.screen.size.y - 48),
      playerSrc
    )
  }

  initKeyboardController() {
    document.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.player.pos.y -= 8
          break
        case 'KeyA':
        case 'ArrowLeft':
          this.player.pos.x -= 8
          break
        case 'KeyS':
        case 'ArrowDown':
          this.player.pos.y += 8
          break
        case 'KeyD':
        case 'ArrowRight':
          this.player.pos.x += 8
          break
        case 'Space':
          this.player.shoot()
          break
      }
    })
  }

  init() {
    this.initKeyboardController()
    this.screen.mount()
    this.run()
  }

  isCollide(a, b) {
    return (
      a.pos.x < b.pos.x + b.size.x &&
      a.pos.x + a.size.x > b.pos.x &&
      a.pos.y < b.pos.y + b.size.y &&
      a.pos.y + a.size.y > b.pos.y
    )
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

  draw(screen) {
    screen.clear()
    this.bg.draw(screen.ctx)
    this.player.draw(screen.ctx)

    this.enemies.map((enemy) => {
      enemy.draw(screen.ctx)
    })

    this.player.playerBullets.map((bullet) => {
      bullet.draw(screen.ctx)
    })
  }

  update() {
    // Screen collision
    if (this.player.pos.x + this.player.size.x > this.screen.size.x) {
      this.player.pos.x = this.screen.size.x - this.player.size.x
    }
    if (this.player.pos.x < 0) {
      this.player.pos.x = 0
    }
    if (this.player.pos.y + this.player.size.y > this.screen.size.y) {
      this.player.pos.y = this.screen.size.x - this.player.size.y
    }
    if (this.player.pos.y < 0) {
      this.player.pos.y = 0
    }

    this.ui.textContent = this.score.toString()

    this.handleCollision()

    this.player.playerBullets.map((bullet) => {
      if (!checkBoundsCollide(bullet)) {
        bullet.active = false
      } else {
        bullet.update()
      }
    })

    this.enemies.map((enemy) => enemy.update())

    this.bg.update()

    this.enemies = this.enemies.filter((enemy) => enemy.active)
    this.player.playerBullets = this.player.playerBullets.filter(
      (bullet) => bullet.active
    )

    if (Math.round(Math.random() * 90) == 1) {
      this.enemies.push(new Enemy(this.screen.ctx, { x: 0, y: 0 }, enemySrc))
    }
  }

  run() {
    this.draw(this.screen)
    this.update()

    requestAnimationFrame(() => this.run())
  }
}
