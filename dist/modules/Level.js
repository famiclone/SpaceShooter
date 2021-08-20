// @ts-nocheck
import { Vec2D } from './Vec2D.js';
export class Level {
    constructor(tileset, tilesetJson, levelMap) {
        this.levelmap = levelMap;
        this.tilesetJson = tilesetJson;
        this.image = tileset;
        this.pos = new Vec2D(0, 0);
        this.size = new Vec2D(16, 16);
        this.vel = new Vec2D(0, 0);
        this.width = this.size.x * 16;
        this.height = this.size.y * 16;
        this.speed = 5;
    }
    update() {
        this.pos.set(this.pos.x + this.vel.x * this.speed, this.pos.y + this.vel.y * this.speed);
    }
    moveUp() {
        this.vel.set(this.vel.x, 1);
    }
    moveRight() {
        this.vel.set(-1, this.vel.y);
    }
    moveDown() {
        this.vel.set(this.vel.x, -1);
    }
    moveLeft() {
        this.vel.set(1, this.vel.y);
    }
    stop(d) {
        this.vel[d] = 0;
    }
    getPosition(name) {
        const el = this.tilesetJson[name] || [-16, 0];
        return new Vec2D(el[0], el[1]);
    }
    draw(ctx) {
        this.levelmap.map((x, i) => {
            x.map((y, j) => {
                const tile = y === '#ff0000' ? 'lightgray' : 'gray';
                const pos = this.getPosition(y);
                // ctx.fillStyle = tile;
                // ctx.fillRect(
                //   this.pos.x + this.size.x * j,
                //   this.pos.y + this.size.y * i,
                //   this.size.x,
                //   this.size.y,
                // );
                ctx.drawImage(this.image, pos.x, pos.y, this.size.x, this.size.y, this.pos.x + this.size.x * j, this.pos.y + this.size.y * i, this.size.x, this.size.y);
            });
        });
    }
}
