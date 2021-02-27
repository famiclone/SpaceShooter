import Game from './modules/Game'
import { GameConfigProps, GameProps } from './types'

const gameConfig: GameConfigProps = {
  width: 255,
  height: 240,
  title: 'SpaceShooter'
}

const game: GameProps = new Game(gameConfig)

game.init()
