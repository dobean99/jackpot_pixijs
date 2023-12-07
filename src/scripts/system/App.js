import * as PIXI from "pixi.js";
import { Loader } from "./Loader";
import { ScenesManager } from "./ScenesManager";
const CONFIG_WIDTH = 800;
const CONFIG_HEIGHT = 600;
class Application {
  run(config) {
    this.config = config;
    this.app = new PIXI.Application({ resizeTo: window, autoDensity: true });
    document.body.appendChild(this.app.view);

    this.loader = new Loader(this.config);
    this.loader.preload().then(() => this.start());

    this.scenes = new ScenesManager();
    this.app.stage.addChild(this.scenes.container);
  }

  res(key) {
    return this.loader.resources[key];
  }

  sprite(key) {
    return new PIXI.Sprite(this.res(key));
  }
  tilingSprite(key, width, height) {
    return new PIXI.TilingSprite(this.res(key), width, height);
  }
  start() {
    this.scenes.start("JungleRich");
  }
}

export const App = new Application();

function resize() {
  // current screen size
  const screenWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  const screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  // scale factor for our game canvas
  const scale = Math.min(
    screenWidth / CONFIG_WIDTH,
    screenHeight / CONFIG_HEIGHT
  );

  // scaled width and height
  const enlargedWidth = Math.floor(scale * CONFIG_WIDTH);
  const enlargedHeight = Math.floor(scale * CONFIG_HEIGHT);

  // margins for centering
  const horizontalMargin = (screenWidth - enlargedWidth) / 2;
  const verticalMargin = (screenHeight - enlargedHeight) / 2;

  // // css to set the sizes and margins
  // App.view.style.width = `${enlargedWidth}px`;
  // App.view.style.height = `${enlargedHeight}px`;
  // App.view.style.marginLeft =
  //   App.view.style.marginRight = `${horizontalMargin}px`;
  // App.view.style.marginTop =
  //   App.view.style.marginBottom = `${verticalMargin}px`;
}
