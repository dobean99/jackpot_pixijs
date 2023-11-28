import { App } from "../system/App";
import { Scene } from "../system/Scene";

export class Game extends Scene {
  create() {
    this.createBackground();
  }
  update() {}
  createBackground() {
    this.bg = App.sprite("bg");
    this.container.addChild(this.bg);
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
  }
}
