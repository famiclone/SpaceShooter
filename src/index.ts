import Game from './modules/Game'
import { GameConfigProps, GameProps } from './types'
import config from './config.json'

const game: Game = new Game(config)

game.init()
