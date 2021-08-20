// @ts-nocheck
import { Vec2D } from './Vec2D.js';
export class Camera {
    constructor(x, y) {
        this.pos = new Vec2D(x, y);
        this.speed = 10;
    }
    update() {
        this.pos.set(this.pos.x + this.vel.x * this.speed, this.pos.y + this.vel.y * this.speed);
    }
}
