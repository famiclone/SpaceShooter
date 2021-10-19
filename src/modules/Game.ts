export interface GameProps {
  init: () => void;
}
export default class Game implements GameProps {
  constructor() {}

  init() {
    console.log('Game init...');
  }
}
