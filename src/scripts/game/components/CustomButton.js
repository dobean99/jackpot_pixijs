import * as PIXI from "pixi.js";
export class CustomButton extends PIXI.Sprite {
  constructor(texture) {
    super();
    this.interactive = true;
    this.texture = texture;
    this.eventMode = "static";
    this.cursor = "pointer";
    this.on("pointerover", () => this.onpointerover())
      .on("pointerout", () => this.onpointerout())
      .on("pointerdown", () => this.onpointerdown())
      .on("pointerup", () => this.onpointerup())
      .on("pointerupoutside", () => this.onpointerup())
      .on("update", () => this.onupdate());
  }
  //   iconButton = new PIXI.Sprite(iconTexture);
  //   buttonStates = {
  //     normal: { alpha: 1.0 },
  //     hover: { alpha: 0.8 },
  //     pressed: { alpha: 0.6 },
  //   };

  onpointerover() {
    this.isOver = true;
  }
  onpointerout() {
    this.isOver = false;
  }
  onpointerdown() {
    this.isdown = true;

    this.scale.set(0.5);
  }
  onpointerup() {
    this.isdown = false;
    this.scale.set(1);
  }
  onupdate() {}
}
