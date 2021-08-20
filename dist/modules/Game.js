export default class Game {
    constructor() { }
    run(dt = 0) {
        // console.log(dt);
        requestAnimationFrame((dt) => this.run(dt));
    }
    init() {
        this.run();
    }
}
