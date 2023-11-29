import { App } from "../system/App";
import { Scene } from "../system/Scene";
import * as PIXI from "pixi.js";
import { GradientText } from "./components/GradientText";

export class Game extends Scene {
  create() {
    this.createBackground();
    this.createTitle();
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
    this.container.addChild(this.bg, this.text);
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
  }
  createTitle() {
    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 36,
      fontStyle: "italic",
      fontWeight: "bold",
      fill: ["#ffffff", "#00ff99"], // gradient
      stroke: "#4a1850",
      strokeThickness: 5,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: "round",
    });
    this.title = new PIXI.Text("Jackpot", style);
    this.container.addChild(this.title);
  }
}
