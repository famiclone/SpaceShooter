import { Vec2D } from './Vec2D.js';
export default class GameObject {
    constructor(ctx, pos, sprite, size = new Vec2D(16, 16)) {
        this.ctx = ctx;
        this.pos = pos;
        this.sprite = sprite;
        this.size = size;
        this.canvas = ctx.canvas;
        this.image = new Image();
        this.pos = new Vec2D(pos.x, pos.y);
        this.active = true;
    }
    isBounds() {
        return (this.pos.x >= 0 &&
            this.pos.x <= this.canvas.width &&
            this.pos.y >= 0 &&
            this.pos.y <= this.canvas.height);
    }
    draw(ctx) {
        ctx.drawImage(this.sprite, this.pos.x, this.pos.y);
    }
    explode() {
        this.active = false;
    }
    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y / 2;
    }
}
