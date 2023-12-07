import * as PIXI from "pixi.js";
import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { GradientText } from "./components/GradientText";
import { CustomButton } from "./components/CustomButton";

import { ReelsContainer } from "./components/ReelContainer";

export class JungleRich extends Scene {
  create() {
    this.createReels();
    this.createPlayButton();
    this.isAutoEnable = false;
  }
  update() {}
  destroy() {}

  createReels() {
    this.text = new GradientText(
      App.config.grandText.text,
      window.innerWidth / 2,
      App.config.grandText.y,
      App.config.grandText.color,
      App.config.grandText.fontSize
    );
    this.reelsContainer = new ReelsContainer(App.app);
    this.container.addChild(this.reelsContainer.reelContainer);
    this.container.addChild(this.text);
  }

  createPlayButton() {
    this.playBtn = new CustomButton(App.res("button"));
    this.playBtn.position.set(
      window.innerWidth - this.playBtn.width,
      window.innerHeight - this.playBtn.height
    );
    this.playBtn.anchor.set(0.5);
    this.playBtn.on("pointerdown", () => {
      this.handleStart();
    });
    this.playBtn.onupdate();

    this.autoPlayBtn = new CustomButton(App.res("button"));
    this.autoPlayBtn.position.set(
      this.playBtn.x - this.autoPlayBtn.width,
      this.playBtn.y
    );
    this.autoPlayBtn.anchor.set(0.5);
    this.autoPlayBtn.on("pointerdown", () => {
      this.autoPlayBtn.disable;
      this.isAutoEnable = !this.isAutoEnable;
      console.log(this.isAutoEnable);
      this.autoPlay();
    });
    this.container.addChild(this.playBtn, this.autoPlayBtn);
  }
  handleStart() {
    // this.playBtn.isInteractive = false;
    this.reelsContainer.startPlay();
  }

  autoPlay() {
    if (this.isAutoEnable) {
      console.log("autoplay");
      window.setInterval(() => this.reelsContainer.startPlay(), 7000);
    }
  }
}
