import { Vec2D } from './Vec2D.js';
export default class FontRenderer {
    constructor(font, fontsheet, position = new Vec2D(0, 0), size = new Vec2D(8, 8)) {
        this.font = font;
        this.fontsheet = fontsheet;
        this.position = position;
        this.size = size;
    }
    getPosition(name) {
        const el = this.fontsheet[name] || [0, 0];
        return new Vec2D(el[0], el[1]);
    }
    drawText(ctx, message, position = new Vec2D(0, 0)) {
        let xOffset = 0;
        let yOffset = 0;
        message.split('').forEach((char) => {
            const pos = this.getPosition(char);
            ctx.drawImage(this.font, pos.x, pos.y, this.size.x, this.size.y, position.x + this.position.x + xOffset, position.y + this.position.y, this.size.x, this.size.y);
            xOffset += this.size.x;
        });
    }
}
