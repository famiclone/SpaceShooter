import Player from './Player';

export class Scene {
  children: any[];
  player: Player | null;
  constructor() {
    this.children = [];
    this.player = null;
  }

  update() {
    if (this.player) {
      this.player.update();
    }
    this.children.map((child) => child.update());
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.player) {
      this.player.draw(ctx);
    }
    this.children.map((child) => child.draw(ctx));
  }

  add(child: any) {
    if (!this.children.some(child)) {
      this.children.push(child);
    }
  }

  remove(child: any) {
    if (this.children.some(child)) {
      this.children.splice(this.children.indexOf(child), 1);
    }
  }
}
