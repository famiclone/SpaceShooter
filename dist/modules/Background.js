// @ts-nocheck
import { checkBoundsCollide } from '../helpers/index.js';
import { Vector2D } from './Vector.js';
class Star {
    constructor(pos, speed = 1, size) {
        this.pos = pos;
        this.speed = speed;
        this.size = size;
        this.active = true;
        this.vel = new Vector2D(0, 0);
        this.color = `rgba(255, 255, 255, ${this.speed / 2})`;
        this.a = 0;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        const circle = new Path2D();
        circle.arc(this.pos.x, this.pos.y, this.size.x, 0, 2 * Math.PI);
        ctx.fill(circle);
    }
    update(delta, vel) {
        // if (this.a >= 1000) {
        this.a = 0;
        this.pos.y += vel.y * this.speed;
        this.pos.x += vel.x * this.speed;
        this.active = this.active && checkBoundsCollide(this);
        // }
        // this.a += delta;
    }
}
export default class Background {
    constructor() {
        this.color = 'black';
        this.stars = [];
        this.vel = new Vector2D(0, 0);
    }
    drawStars(ctx) {
        const random = Math.floor(Math.random() * Math.floor(10));
        const speed = random;
        const size = new Vector2D(2 / speed, 5 / speed);
        if (this.stars.length < 50 && Math.round(Math.random() * 5) === 1) {
            let position = new Vector2D(0, 0);
            // Camera move down
            if ((this.vel.y = -1)) {
                position = new Vector2D(Math.floor(Math.random() * ctx.canvas.width), ctx.canvas.height);
            }
            if ((this.vel.y = 1)) {
                position = new Vector2D(Math.floor(Math.random() * ctx.canvas.width), 0);
            }
            this.stars.push(new Star(position, speed, size));
        }
    }
    stop(d) {
        this.vel[d] = 0;
    }
    draw(ctx) {
        // ctx.fillStyle = this.color
        // ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        this.drawStars(ctx);
        this.stars.map((star) => {
            star.draw(ctx);
        });
    }
    update(delta) {
        this.stars.map((star) => {
            star.update(delta, this.vel);
        });
        this.stars = this.stars.filter((star) => star.active);
    }
}
