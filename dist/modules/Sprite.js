// @ts-nocheck
import { Vec2D } from './Vec2D.js';
export class Sprite {
    // sprite: HTMLImageElement
    constructor(image, name, spritesheet, size = new Vec2D(16, 16)) {
        this.image = image;
        this.name = name;
        this.spritesheet = spritesheet;
        this.size = size;
        this.canvas = document.createElement('canvas');
        // Set canvas size
        this.canvas.width = this.size.x;
        this.canvas.height = this.size.y;
        // Get context
        this.ctx = this.canvas.getContext('2d');
        const pos = this.getPosition();
        // Draw image on the canvas
        this.ctx.drawImage(this.image, pos.x, pos.y, this.size.x, this.size.y, 0, 0, this.size.x, this.size.y);
        this.sprite = this.canvas;
    }
    getPosition() {
        const el = this.spritesheet[this.name] || [0, 0];
        return new Vec2D(el[0], el[1]);
    }
}
