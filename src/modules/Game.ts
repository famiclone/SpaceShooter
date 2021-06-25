import Background from './Background';
import Player from './Player';
// import UI from './UI';
import Screen from './Screen';
import Enemy from './Enemy';
import FontRenderer from './FontRenderer';
import { GameConfigProps } from '../types';
import { checkBoundsCollide, RGBAToHEX } from '../helpers';
// import { EnemyType } from './Enemy';

import font from 'url:../images/font.png';
import fontsheet from '../images/font.json';

import sprite from 'url:../images/spritesheet.png';
import spritejson from '../images/spritesheet.json';

import tileset from 'url:../images/tileset.png';
import tilesetJson from '../images/tileset.json';

import level01 from 'url:../levels/level01.png';

import { Vec2D } from './Vec2D';
import { Sprite } from './Sprite';
import { Level } from './Level';

import { AssetLoader } from './AssetLoader';

const interval = (cb) => setInterval(cb, 1000);
const count = 0;

enum COLORS {
  '#000000', // EMPTY
  '#ffffff', // BLOCK
  '#ff0000', // BLOCK_RED
}

function parseImageMap(image, callback) {
  const canvas = document.createElement('canvas');
  document.body.append(canvas);

  const dataMap = [];

  const imageWidth: number = image.width;
  const imageHeight: number = image.height;

  canvas.width = imageWidth;
  canvas.height = imageHeight;

  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0, imageWidth, imageHeight);

  for (let y = 0; y < imageHeight; y++) {
    const arr = [];
    for (let x = 0; x < imageWidth; x++) {
      const pixel: Uint8ClampedArray = ctx.getImageData(x, y, 1, 1).data;
      arr.push(COLORS[RGBAToHEX(pixel[0], pixel[1], pixel[2])]);
    }
    dataMap.push(arr);
  }
  return dataMap;
}

const scene = {
  levelMap: [],
};

export default class Game {
  screen: Screen;
  level: {
    map: number[][];
  };
  ui: HTMLDivElement;
  enemies: Enemy[];
  state: {
    score: number;
    playerSpeed: number;
  };
  bg: any;
  player: Player;
  fontRenderer: FontRenderer;
  sprite: HTMLImageElement;
  loaded: number;
  tileset: HTMLImageElement;

  font: HTMLImageElement;

  constructor(private config: GameConfigProps) {
    this.ui = document.createElement('div');
    // this.scene = new SceneLoader();
    this.screen = new Screen(new Vec2D(this.config.width, this.config.height));
    this.ui.className = 'ui';
    this.enemies = [];
    this.bg = new Background();

    this.state = {
      score: 0,
      playerSpeed: 3,
    };

    this.assets = null;
    this.loaded = false;

    this.player = null;
    this.fontRenderer = null;
    this.level = null;

    new AssetLoader()
      .load([font, tileset, sprite, level01])
      .then((assets) => this.setup(assets));
  }

  setup(assets) {
    this.assets = assets;
    this.loaded = true;

    this.player = new Player(
      this.screen.ctx,
      new Vec2D(this.screen.size.x / 2, this.screen.size.y - 48),
      new Sprite(
        this.assets.spritesheet,
        'player',
        spritejson,
        new Vec2D(16, 16),
      ).sprite,
      this.state.playerSpeed,
    );

    this.initKeyboardController();
    const levelMap = parseImageMap(this.assets.level01);

    this.level = new Level(this.assets.tileset, tilesetJson, levelMap);
    this.fontRenderer = new FontRenderer(
      this.assets.font,
      fontsheet,
      new Vec2D(8, 8),
    );
  }

  initKeyboardController() {
    const onKeyDown = (e: KeyboardEvent) => {
      const { code } = e;

      switch (code) {
        case 'KeyD':
          this.level.moveRight();
          this.bg.vel.set(-1, this.bg.vel.y);
          break;
        case 'KeyW':
          this.level.moveUp();
          this.bg.vel.set(this.bg.vel.x, 1);
          break;
        case 'KeyS':
          this.level.moveDown();
          this.bg.vel.set(this.bg.vel.x, -1);
          break;
        case 'KeyA':
          this.level.moveLeft();
          this.bg.vel.set(1, this.bg.vel.y);
          break;
        case 'Space':
          this.player.shoot();
          break;
        default:
        //
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const { code } = e;

      switch (code) {
        case 'KeyD':
          this.level.stop('x');
          this.bg.stop('x');
          break;
        case 'KeyW':
          this.level.stop('y');
          this.bg.stop('y');
          break;
        case 'KeyS':
          this.level.stop('y');
          this.bg.stop('y');
          break;
        case 'KeyA':
          this.level.stop('x');
          this.bg.stop('x');
          break;
        default:
        //
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
  }

  init() {
    this.initKeyboardController();
    this.screen.mount();
    this.run();
  }

  isCollide(a, b) {
    return (
      a.pos.x < b.pos.x + b.size.x &&
      a.pos.x + a.size.x > b.pos.x &&
      a.pos.y < b.pos.y + b.size.y &&
      a.pos.y + a.size.y > b.pos.y
    );
  }

  handleCollision() {
    this.player.playerBullets.map((bullet) => {
      this.enemies.map((enemy) => {
        if (this.isCollide(bullet, enemy)) {
          enemy.explode();
          this.state.score += 100;
          bullet.active = false;
        }
      });
    });

    this.enemies.map((enemy) => {
      if (this.isCollide(enemy, this.player)) {
        enemy.explode();
        this.player.explode();
      }
    });
  }

  draw(screen): void {
    screen.clear();

    // this.fontRenderer.drawText(screen.ctx, 'A')
    this.level.draw(screen.ctx);
    // this.bg.draw(screen.ctx);
    this.player.draw(screen.ctx);

    this.enemies.map((enemy) => {
      enemy.draw(screen.ctx);
    });

    this.player.playerBullets.map((bullet) => {
      bullet.draw(screen.ctx);
    });

    this.fontRenderer.drawText(
      screen.ctx,
      `SCORE ${this.state.score.toString()}`,
      new Vec2D(8, 8),
    );
  }

  update() {
    this.level.update();
    this.player.update();
    // Screen collision
    if (this.player.pos.x + this.player.size.x > this.screen.size.x) {
      this.player.pos.x = this.screen.size.x - this.player.size.x;
    }
    if (this.player.pos.x < 0) {
      this.player.pos.x = 0;
    }
    if (this.player.pos.y + this.player.size.y > this.screen.size.y) {
      this.player.pos.y = this.screen.size.x - this.player.size.y;
    }
    if (this.player.pos.y < 0) {
      this.player.pos.y = 0;
    }

    this.ui.textContent = this.state.score.toString();

    this.handleCollision();

    this.player.playerBullets.map((bullet) => {
      if (!checkBoundsCollide(bullet)) {
        bullet.active = false;
      } else {
        bullet.update();
      }
    });

    this.enemies.map((enemy) => enemy.update());

    // this.bg.update();

    this.enemies = this.enemies.filter((enemy) => enemy.active);
    this.player.playerBullets = this.player.playerBullets.filter(
      (bullet) => bullet.active,
    );

    // Random spawn enemies

    // if (Math.round(Math.random() * 90) == 1) {
    //   this.enemies.push(
    //     new Enemy(
    //       this.screen.ctx,
    //       { x: 0, y: 0 },
    //       new Sprite(
    //         this.assets.spritesheet,
    //         'enemy',
    //         spritejson,
    //         new Vec2D(16, 16),
    //       ).sprite,
    //     ),
    //   );
    // }
  }

  run() {
    if (this.loaded) {
      this.draw(this.screen);
      this.update();
    }

    requestAnimationFrame(() => this.run());
  }
}
