import Background from './Background'
import Player from './Player'
import UI from './UI'
import Screen from './Screen'
import Enemy from './Enemy'
import FontRenderer from './FontRenderer'
import { GameConfigProps } from '../types'
import { checkBoundsCollide } from '../helpers'
import { EnemyType } from './Enemy'

import font from '../images/font.png'
import fontsheet from '../images/font.json'

import sprite from '../images/spritesheet.png'
import spritejson from '../images/spritesheet.json'

import tileset from '../images/tileset.png'
import tilesetJson from '../images/tileset.json'

import config from '../config.json'

import { Vec2D } from './Vec2D'
import { Sprite } from './Sprite'
import { Level } from './Level'

import { assets } from '../helpers'
import { AssetLoader } from './AssetLoader'

const level = {
  // prettier-ignore
  map: [
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
  ]
}

const interval = (cb) => setInterval(cb, 1000)
const count = 0

export default class Game {
  screen: Screen
  level: any
  ui: HTMLDivElement
  enemies: Enemy[]
  score: number
  bg: any
  player: Player
  fontRenderer: FontRenderer
  sprite: HTMLImageElement
  loaded: number
  tileset: HTMLImageElement
  playerSpeed: number

  font: HTMLImageElement

  constructor(private config: GameConfigProps) {
    this.ui = document.createElement('div')
    this.screen = new Screen(new Vec2D(this.config.width, this.config.height))
    this.ui.className = 'ui'
    this.enemies = []
    this.score = 0
    this.bg = new Background()
    this.playerSpeed = 3

    this.assets = null
    this.loaded = false

    this.player = null
    this.fontRenderer = null
    this.level = null

    new AssetLoader().load([font, tileset, sprite]).then((assets) => this.setup(assets))

    console.log(this)
  }

  setup(assets) {
    this.assets = assets
    this.loaded = true

    this.player = new Player(
      this.screen.ctx,
      new Vec2D(this.screen.size.x / 2, this.screen.size.y - 48),
      new Sprite(this.assets.spritesheet, 'player', spritejson, new Vec2D(16, 16)).sprite,
      this.playerSpeed
    )

    this.initKeyboardController()

    this.level = new Level(this.assets.tileset, tilesetJson, level)
    this.fontRenderer = new FontRenderer(this.assets.font, fontsheet, new Vec2D(8, 8))
  }

  initKeyboardController() {
    const onKeyDown = (e) => {
      const { code } = e

      switch (code) {
        case 'KeyD':
          this.level.moveRight()
          this.bg.vel.set(-1, this.bg.vel.y)
          break
        case 'KeyW':
          this.level.moveUp()
          this.bg.vel.set(this.bg.vel.x, 1)
          break
        case 'KeyS':
          this.level.moveDown()
          this.bg.vel.set(this.bg.vel.x, -1)
          break
        case 'KeyA':
          this.level.moveLeft()
          this.bg.vel.set(1, this.bg.vel.y)
          break
        case 'Space':
          this.player.shoot()
          break
        default:
        //
      }
    }

    const onKeyUp = (e) => {
      const { code } = e

      switch (code) {
        case 'KeyD':
          this.level.stop('x')
          this.bg.stop('x')
          break
        case 'KeyW':
          this.level.stop('y')
          this.bg.stop('y')
          break
        case 'KeyS':
          this.level.stop('y')
          this.bg.stop('y')
          break
        case 'KeyA':
          this.level.stop('x')
          this.bg.stop('x')
          break
        default:
        //
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
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

    // this.fontRenderer.drawText(screen.ctx, 'A')
    this.level.draw(screen.ctx)
    this.bg.draw(screen.ctx)
    this.player.draw(screen.ctx)

    this.enemies.map((enemy) => {
      enemy.draw(screen.ctx)
    })

    this.player.playerBullets.map((bullet) => {
      bullet.draw(screen.ctx)
    })

    this.fontRenderer.drawText(screen.ctx, `SCORE ${this.score.toString()}`, new Vec2D(8, 8))
  }

  update() {
    this.level.update()
    this.player.update()
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
    this.player.playerBullets = this.player.playerBullets.filter((bullet) => bullet.active)

    if (Math.round(Math.random() * 90) == 1) {
      this.enemies.push(
        new Enemy(
          this.screen.ctx,
          { x: 0, y: 0 },
          new Sprite(this.assets.spritesheet, 'enemy', spritejson, new Vec2D(16, 16)).sprite
        )
      )
    }
  }

  run() {
    if (this.loaded) {
      this.draw(this.screen)
      this.update()
    }

    requestAnimationFrame(() => this.run())
  }
}
