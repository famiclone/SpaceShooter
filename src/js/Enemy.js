import Person from './Person.js';

class Enemy extends Person {
	constructor(ctx, x, y, canvas) {
		super(ctx, x, y, canvas);
		this.color = 'red';
		this.x = Math.round(this.canvas.width / 4 + Math.random() * this.canvas.width / 2);
		this.yVelocity = 3;
		this.width = 16;
		this.height = 16;
	}

	explode() {
		this.active = false;
	}
};

export default Enemy;
