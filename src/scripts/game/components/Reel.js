import { App } from "../../system/App.js";
import * as PIXI from "pixi.js";
import Symbol from "./Symbol.js";
const REEL_WIDTH = 160;
const SYMBOL_SIZE = 150;
const NUMBER_OF_ROWS = 3;

export class Reel {
  constructor(position) {
    this.rc = new PIXI.Container();
    this.rc.x = position * REEL_WIDTH;
    this.slotTextures = [
      "Jk",
      "Kg",
      "Ac",
      "P1",
      "P2",
      "P3",
      "P4",
      "P5",
      "WX",
      "SC",
    ];
    this.generate();
  }
  generate() {
    this.reel = {
      container: this.rc,
      symbols: [],
      position: 0,
      previousPosition: 0,
      blur: new PIXI.BlurFilter(),
    };
    blur = new PIXI.BlurFilter((0, 0), 4, PIXI.Filter.defaultResolution, 5);
    this.reel.blur = blur;
    this.rc.filters = [this.reel.blur];
    for (let j = 0; j <= NUMBER_OF_ROWS; j++) {
      const symbol = App.sprite(
        this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)]
      );

      symbol.y = j * SYMBOL_SIZE;
      symbol.scale.x = symbol.scale.y = Math.min(
        SYMBOL_SIZE / symbol.width,
        SYMBOL_SIZE / symbol.height
      );
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
      this.reel.symbols.push(symbol);
      this.rc.addChild(symbol);
    }
  }
}
