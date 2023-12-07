import * as PIXI from "pixi.js";
import { Reel } from "./Reel";
import { App } from "../../system/App";
const NUMBER_OF_REELS = 5;
const SYMBOL_SIZE = 150;
const REEL_WIDTH = 160;

export class ReelsContainer {
  constructor(app) {
    this.reelContainer = new PIXI.Container();
    this.app = app;
    this.reels = [];
    // this.frame = this.createFrame(app);
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
    this.running = false;
    this.tweening = [];
    for (let i = 0; i < NUMBER_OF_REELS; i++) {
      const reel = new Reel(i);
      const rc = reel.rc;
      this.reelContainer.addChild(rc);
      this.reels.push(reel.reel);
    }

    const margin = (this.app.screen.height - SYMBOL_SIZE * 3) / 2;
    const top = new PIXI.Graphics();
    top.beginFill("#ff0000", 1);
    top.drawRect(0, -SYMBOL_SIZE, REEL_WIDTH * 5, SYMBOL_SIZE);
    this.reelContainer.y = margin;
    this.reelContainer.x = (window.innerWidth - SYMBOL_SIZE * 5) / 2;
    const bottom = new PIXI.Graphics();
    bottom.beginFill("#ff0000", 1);
    bottom.drawRect(0, SYMBOL_SIZE * 3, REEL_WIDTH * 5, SYMBOL_SIZE * 2);
    this.reelContainer.addChild(top, bottom);
    this.currentSymbols = [
      ["Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac"],
    ];

    this.resultMatrixSymbol = [
      ["Ac", "Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac", "Ac"],
      ["Ac", "Ac", "Ac", "Ac"],
    ];
    console.log("this.reels", this.reels);
    this.app.ticker.add(this.update, this);
    this.app.ticker.add(this.tweeningUpdate, this);
  }

  createFrame(app) {
    const width = app.screen.width;
    const height = app.screen.height;
    const rectangleBorder = new PIXI.Graphics();
    rectangleBorder.lineStyle(5, 0xffffff);
    rectangleBorder.drawRect(0, 0, width * 0.5, height * 0.5);
    rectangleBorder.endFill();
    rectangleBorder.position.set(
      width / 2 - rectangleBorder.width / 2,
      height / 2 - rectangleBorder.height / 2
    );
    this.reelContainer.addChild(rectangleBorder);
    return rectangleBorder;
  }

  startPlay() {
    console.log("running", this.running);
    if (this.running) return;
    this.running = true;

    for (let i = 0; i < this.reels.length; i++) {
      const r = this.reels[i];
      const extra = Math.floor(Math.random() * 3);
      const target = r.position + 10 + i * 5 + extra;
      const time = 2500 + i * 600 + extra * 600;

      this.tweenTo(
        r,
        "position",
        target,
        time,
        this.backout(0.5),
        null,
        i === this.reels.length - 1
          ? () => {
              this.reelsComplete();
            }
          : null
      );

      console.log(i, this.reels.length - 1);
    }
  }
  update(delta) {
    // Update the slots.
    for (let i = 0; i < this.reels.length; i++) {
      const r = this.reels[i];
      // Update blur filter y amount based on speed.
      // This would be better if calculated with time in mind also. Now blur depends on frame rate.

      r.blur.blurY = (r.position - r.previousPosition) * 8;
      r.previousPosition = r.position;

      // Update symbol positions on reel.

      for (let j = 0; j < r.symbols.length; j++) {
        const s = r.symbols[j];
        const prevy = s.y;

        s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;

        if (s.y < 0 && prevy > SYMBOL_SIZE) {
          // Detect going over and swap a texture.
          // This should in proper product be determined from some logical reel.

          s.texture = App.res(
            // this.nextSymbols[i][j]
            this.slotTextures[
              Math.floor(Math.random() * this.slotTextures.length)
            ]
          );
          s.scale.x = s.scale.y = Math.min(
            SYMBOL_SIZE / s.texture.width,
            SYMBOL_SIZE / s.texture.height
          );
          s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
        }
      }
    }
  }

  tweeningUpdate(delta) {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < this.tweening.length; i++) {
      const t = this.tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);
      t.object[t.property] = this.lerp(
        t.propertyBeginValue,
        t.target,
        t.easing(phase)
      );
      if (t.change) t.change(t);
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) t.complete(t);
        remove.push(t);
      }
    }
    for (let i = 0; i < remove.length; i++) {
      this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
    }
  }

  reelsComplete() {
    for (let i = 0; i < this.reels.length; i++) {
      const reel = this.reels[i];
      const symbolIndex = this.resultMatrixSymbol[i];
      const symbol = reel.symbols[symbolIndex];
      // symbol.texture = App.res(this.slotTextures[symbolIndex]); // Replace with actual texture selection logic
    }
    this.running = false;
  }

  tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
    };

    this.tweening.push(tween);

    return tween;
  }

  backout(amount) {
    return (t) => --t * t * ((amount + 1) * t + amount) + 1;
  }

  lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
  }
}
