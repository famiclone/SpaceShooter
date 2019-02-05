export default class Bullet {
	constructor(ctx, x, y, config) {
		this.active = true;
		this.config = config;
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.width = 3;
		this.height = 3;
		this.xVelocity = 0;
		this.yVelocity = -5;
		this.inBounds = function() {
			return (
				this.x >= 0 &&
				this.x <= this.config.width &&
				this.y >= 0 &&
				this.y <= this.config.height
			)
		};
	}

	draw() {
		this.ctx.fillStyle = 'orange';
		this.ctx.fillRect(this.x, this.y, this.width, this.height + 3);
	}

	update() {
		this.y += this.yVelocity;
		this.x += this.xVelocity;

		this.active = this.active && this.inBounds();
	}
}

