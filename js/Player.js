import Person from './Person.js';
import Bullet from './Bullet.js';

class Player extends Person {
	constructor(ctx, x, y, config) {
		super(ctx, x, y)
		this.config = config;
		this.color = 'blue';
		this.width = 21;
		this.height = 21;
		this.active = true;
		this.playerBullets = [];
		this.midpoint = function() {
			return {
				x: this.x + this.width / 2,
				y: this.y,
			}	
		}
	}

	shoot() {
		let bulletPosition = this.midpoint();

		this.playerBullets.push(new Bullet(
			this.ctx,
			bulletPosition.x,
			bulletPosition.y,
			this.config
		));
	}

	explode() {
		this.active = false;
	}

};

export default Player;
