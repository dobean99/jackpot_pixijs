import * as PIXI from "pixi.js";

export class GradientText extends PIXI.Text {
  constructor(text, x, y, color, fontSize) {
    super();
    this.x = x;
    this.y = y;
    this.text = text;
    this.anchor.set(0.5);
    this.style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: fontSize ?? 36,
      fontWeight: "bold",
      fill: color ?? ["#ff9600", "#ff5200"], // gradient
      fillGradientType: 0,
      stroke: "#4a1850",
      strokeThickness: 5,
      wordWrap: true,
      wordWrapWidth: 440,
      lineJoin: "round",
    });
  }
}
