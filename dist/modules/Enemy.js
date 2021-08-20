// @ts-nocheck
// import { SpriteProps } from '../types';
import GameObject from './GameObject.js';
import { Vec2D } from './Vec2D.js';
export var EnemyType;
(function (EnemyType) {
    EnemyType[EnemyType["Zoraxx"] = 0] = "Zoraxx";
    EnemyType[EnemyType["Mii"] = 1] = "Mii";
})(EnemyType || (EnemyType = {}));
class Enemy extends GameObject {
    constructor(ctx, pos, sprite) {
        super(ctx, pos, sprite, new Vec2D(16, 16));
        this.age = Math.floor(Math.random() * 128);
        this.pos.x = Math.round(ctx.canvas.width / 4 + (Math.random() * ctx.canvas.width) / 2);
        this.vel = new Vec2D(0, 3);
    }
    explode() {
        this.active = false;
    }
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y / 2;
        this.vel.x = 3 * Math.sin((this.age * Math.PI) / 64);
        this.age++;
        this.active = this.active && this.isBounds();
    }
}
export default Enemy;
