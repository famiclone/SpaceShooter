// @ts-nocheck
import Background from './Background.js';
import Player from './Player.js';
import Screen from './Screen.js';
import Enemy from './Enemy.js';
import FontRenderer from './FontRenderer.js';
import { checkBoundsCollide, RGBAToHEX } from '../helpers/index.js';
import { LevelImgMap } from '../types.js';
import { Vector2D } from './Vector.js';
import { Sprite } from './Sprite.js';
import { Level } from './Level.js';
import { AssetLoader } from './AssetLoader.js';
const assets = [
    './images/font.png',
    './images/fontMap.json',
    './images/spritesheet.png',
    './images/spritesheetMap.json',
    './levels/level01.png',
    './images/tileset.png',
    './images/tilesetMap.json',
];
function parseImageMap(image, callback) {
    const canvas = document.createElement('canvas');
    const dataMap = [];
    const imageWidth = image.width;
    const imageHeight = image.height;
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, imageWidth, imageHeight);
    for (let y = 0; y < imageHeight; y++) {
        const arr = [];
        for (let x = 0; x < imageWidth; x++) {
            const pixel = ctx.getImageData(x, y, 1, 1).data;
            arr.push(LevelImgMap[RGBAToHEX(pixel[0], pixel[1], pixel[2])]);
        }
        dataMap.push(arr);
    }
    return { dataMap, canvas };
}
const scene = {
    levelMap: [],
};
export default class Game {
    constructor(config) {
        this.config = config;
        this.ui = document.createElement('div');
        // this.scene = new SceneLoader();
        this.screen = new Screen(new Vector2D(this.config.width, this.config.height));
        this.hud = new Screen(new Vector2D(this.config.width, this.config.height), 'hud');
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
        new AssetLoader().load(assets).then((assets) => this.setup(assets));
    }
    setup(assets) {
        this.assets = assets;
        this.loaded = true;
        this.player = new Player(this.screen.ctx, new Vector2D(this.screen.size.x / 2, this.screen.size.y - 48), new Sprite(this.assets.spritesheet, 'player', this.assets.spritesheetMap, new Vector2D(16, 16)).sprite, this.state.playerSpeed);
        this.initKeyboardController();
        const { dataMap: levelMap, canvas: miniMap } = parseImageMap(this.assets.level01);
        this.level = new Level(this.assets.tileset, this.assets.tilesetMap, levelMap);
        this.fontRenderer = new FontRenderer(this.assets.font, this.assets.fontMap, new Vector2D(8, 8));
        this.miniMap = miniMap;
        window.game = this;
    }
    initKeyboardController() {
        const onKeyDown = (e) => {
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
        const onKeyUp = (e) => {
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
        this.run();
    }
    isCollide(a, b) {
        return (a.pos.x < b.pos.x + b.size.x &&
            a.pos.x + a.size.x > b.pos.x &&
            a.pos.y < b.pos.y + b.size.y &&
            a.pos.y + a.size.y > b.pos.y);
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
    draw(screen) {
        screen.clear();
        this.hud.clear();
        // this.fontRenderer.drawText(screen.ctx, 'A');
        this.level.draw(screen.ctx);
        this.bg.draw(screen.ctx);
        this.player.draw(screen.ctx);
        this.enemies.map((enemy) => {
            enemy.draw(screen.ctx);
        });
        this.player.playerBullets.map((bullet) => {
            bullet.draw(screen.ctx);
        });
        this.fontRenderer.drawText(this.hud.ctx, `SCORE ${this.state.score.toString()}`, new Vector2D(8, 8));
        this.hud.ctx?.drawImage(this.miniMap, this.screen.size.x - this.miniMap.width, 0);
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
            }
            else {
                bullet.update();
            }
        });
        this.enemies.map((enemy) => enemy.update());
        this.bg.update();
        this.enemies = this.enemies.filter((enemy) => enemy.active);
        this.player.playerBullets = this.player.playerBullets.filter((bullet) => bullet.active);
        // Random spawn enemies
        if (Math.round(Math.random() * 90) == 1) {
            this.enemies.push(new Enemy(this.screen.ctx, { x: 0, y: 0 }, new Sprite(this.assets.spritesheet, 'enemy', this.assets.spritesheetMap, new Vector2D(16, 16)).sprite));
        }
    }
    run() {
        if (this.loaded) {
            this.draw(this.screen);
            this.update();
        }
        requestAnimationFrame(() => this.run());
    }
}
