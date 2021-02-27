class Star {
	constructor(ctx, canvas) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.active = true;
		this.x = Math.floor(Math.random() * this.canvas.width);
		this.y = 0;
		this.dest = Math.random();
		this.color = `rgba(255, 255, 255, ${this.dest})`
		this.xVelocity = 0;
		this.yVelocity = this.dest > 0.7 ? 20 : this.dest > 0.5 ? 10 : 5;
		this.active = true;

		this.inBounds = function() {	
			return (this.x >= 0 &&
				this.x <= this.canvas.width &&
				this.y >= 0 &&
				this.y <= this.canvas.height
			)
		}
	}

	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(this.x, this.y, 3, 3);
	}

	update() {
		this.y += this.yVelocity / 10;
		this.active = this.active && this.inBounds();
	}
}

export default class Background {
	constructor(ctx, canvas) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.color = 'black';
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.stars = [];
	}


	drawStars() {
		if(Math.round(Math.random() * 20) == 1) {
			this.stars.push(new Star(this.ctx, this.canvas));
		};
	}

	draw() {
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		
		this.drawStars();
		this.stars.map(star => {
			star.draw()
		})
	}

	update() {
		this.stars.map(star => {
			star.update()
		});

		this.stars = this.stars.filter(star => star.active);
	}
};
