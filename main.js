import Background from './js/Background.js';
import Player from './js/Player.js';
import UI from './js/UI.js';
import Enemy from './js/Enemy.js';

const config = {
	width: 320,
	height: 280
}

const ui = document.createElement('div');
ui.className = 'ui';


const canvas = document.createElement('canvas');
canvas.width = config.width;
canvas.height = config.height;
const ctx = canvas.getContext('2d'); 
document.querySelector('#screen').appendChild(canvas);
document.querySelector('#screen').appendChild(ui);

const bg = new Background(ctx, config);
const player = new Player(ctx, canvas.width / 2, canvas.height - 48, config);

document.addEventListener('keydown', event => {
	switch(event.keyCode) {
		case 87: // w
			player.y -= 32;
			break;
		case 65: // a
			player.x -= 32;
			break;
		case 83: // s
			player.y += 32;
			break;
		case 68: // d
			player.x += 32;
			break;
		case 32: // space
			player.shoot();
			break;
	}
});

let enemies = [];

let score = 0;

const collides = (a, b) => {
	return a.x < b.x + b.width &&
				 a.x + a.width > b.x &&
				 a.y < b.y + b.height &&
				 a.y + a.height > b.y
};

function handleCollisions() {
	player.playerBullets.map(bullet => {
		enemies.map(enemy => {

			if (collides(bullet, enemy)) {
				enemy.explode();
				score += 100;
				bullet.active = false;
			}
		});
	});

	enemies.map(function(enemy) {
		if (collides(enemy, player)) {
			enemy.explode();
			player.explode();
		}
	});
}

const update = () => {
	// Screen collision
	if ((player.x + player.width) > canvas.width) {
		player.x = canvas.width - player.width
	}
	if (player.x < 0) {
		player.x = 0;
	}
	if ((player.y + player.height) > canvas.height) {
		player.y = canvas.height - player.height
	}
	if (player.y < 0) {
		player.y = 0; 
	}

	ui.textContent = score;

	handleCollisions();

	player.playerBullets.map(bullet => {
		bullet.update();
	});

	enemies.map(enemy => {
		enemy.update()
	});

	bg.update();

	enemies = enemies.filter(enemy => enemy.active);
	player.playerBullets = player.playerBullets.filter(bullet => bullet.active);

	if(Math.round(Math.random() * 90) == 1) {
		enemies.push(new Enemy(ctx, 0, 0, config));
	};

	//console.log(enemies.length);


}

const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	bg.draw();
	player.draw('./images/player.png');

	enemies.map(enemy => {
		enemy.draw('./images/enemy.png')
	});

	player.playerBullets.map(bullet => {
		bullet.draw();
	});


}

const game = () => {
	update();
	draw();
	//requestAnimationFrame(game)
	player.active ? requestAnimationFrame(game) : location.reload();
}

game();
