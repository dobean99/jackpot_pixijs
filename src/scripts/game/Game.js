import { App } from "../system/App";
import { Scene } from "../system/Scene";
import * as PIXI from "pixi.js";
import { GradientText } from "./components/GradientText";
import { CustomButton } from "./components/CustomButton";
import { InfomationPopup } from "./overlays/InfomationPopup";

export class Game extends Scene {
  create() {
    this.createBackground();
  }
  update() {}
  createBackground() {
    this.bg = App.sprite("bg");
    this.text = new GradientText(
      App.config.grandText.text,
      window.innerWidth / 2,
      App.config.grandText.y,
      App.config.grandText.color,
      App.config.grandText.fontSize
    );
    console.log(" window.innerWidth", window.innerWidth);
    const infomationPopup = new InfomationPopup(
      30,
      30,
      window.innerWidth - 30,
      window.innerHeight - 30
    );
    infomationPopup.createPopup(
      window.innerWidth - 60,
      window.innerHeight - 60
    );
    this.infoButton = new CustomButton(App.res("button"));
    this.infoButton.on("pointerdown", () => {
      infomationPopup.showPopup();
    });
    this.container.addChild(
      this.bg,
      this.text,
      this.infoButton,
      infomationPopup
    );
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
  }
}
