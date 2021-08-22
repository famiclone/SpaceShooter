// @ts-nocheck

import Game from './modules/Game.js';
import { config } from './config.js';

const game: Game = new Game(config);

game.init();
