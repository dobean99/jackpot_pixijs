import * as PIXI from "pixi.js";
import { GradientText } from "../components/GradientText";
import { App } from "/Users/dnkdo/Documents/jackpot_pixijs/src/scripts/system/App.js";

export class InfomationPopup extends PIXI.Container {
  constructor(x, y, width, height) {
    super();
    this.x = x;
    this.y = y;
    this.visible = false;
    // this.width = width;
    // this.height = height;
    // this.createPopup();
  }

  createGradient = (width, height, colorFrom, colorTo) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, height);

    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);

    gradient.addColorStop(0, colorFrom);
    gradient.addColorStop(1, colorTo);

    ctx.fillStyle = gradient;
    ctx.roundRect(0, 0, width, height, 20);
    ctx.strokeStyle = "white";
    ctx.fill();
    ctx.stroke();

    return PIXI.Sprite.from(canvas);
  };

  createPopup(width, height) {
    // Create the popup background
    const gradient = this.createGradient(width, height, "#663ccf", "#500ff2");
    this.addChild(gradient);
    const image1 = App.res("bg");
    const image2 = App.res("button");
    const image3 = App.res("bg");
    const imageSprites = [
      new PIXI.Sprite(image1),
      new PIXI.Sprite(image2),
      new PIXI.Sprite(image3),
    ];

    imageSprites[0].visible = true;
    for (let i = 1; i < imageSprites.length; i++) {
      imageSprites[i].visible = false;
    }

    // Add images to slideshow container
    for (const sprite of imageSprites) {
      sprite.width = 300;
      sprite.height = 200;
      sprite.position.set(width / 2, height / 2);
      sprite.anchor.set(0.5);
      this.addChild(sprite);
    }
    const style = {
      fontFamily: "Arial",
      fontSize: 16,
      fill: "#ffffff",
    };
    // Create the popup title
    const popupTitle = new GradientText(
      "PROGRESSIVE JACKPOT",
      0,
      0,
      ["#ffffff", "#663ccf"],
      30
    );

    popupTitle.position.set(this.width / 2, 20);
    popupTitle.anchor.set(0.5, 0);
    this.addChild(popupTitle);

    const line = new PIXI.Graphics();
    line.beginFill(0x3d3d3d);
    line.drawRect(20, 60, width - 20 * 2, 2);
    line.endFill();
    this.addChild(line);

    const popupCloseButton = new PIXI.Graphics();
    popupCloseButton.beginFill(0xff0000);
    popupCloseButton.drawRect(this.width - 40, 20, 20, 20);
    popupCloseButton.endFill();
    this.addChild(popupCloseButton);

    // Create prev and next buttons
    const prevButton = new PIXI.Graphics();
    prevButton.beginFill(0xff0000);
    prevButton.drawRect(0, 0, 50, 50);
    prevButton.endFill();
    prevButton.position.set(0, height / 2);
    this.addChild(prevButton);

    const nextButton = new PIXI.Graphics();
    nextButton.beginFill(0xff0000);
    nextButton.drawRect(0, 0, 50, 50);
    nextButton.endFill();
    nextButton.position.set(width - 50, height / 2);
    this.addChild(nextButton);

    let currentImageIndex = 0;

    prevButton.interactive = true;
    prevButton.on("pointerdown", () => {
      if (currentImageIndex > 0) {
        imageSprites[currentImageIndex].visible = false;
        currentImageIndex--;
        imageSprites[currentImageIndex].visible = true;
      }
    });

    nextButton.interactive = true;
    nextButton.on("pointerdown", () => {
      if (currentImageIndex < imageSprites.length - 1) {
        imageSprites[currentImageIndex].visible = false;
        currentImageIndex++;
        imageSprites[currentImageIndex].visible = true;
      }
    });

    // Add event listener to close button
    popupCloseButton.interactive = true;
    popupCloseButton.on("pointerdown", () => {
      this.visible = false;
    });

    //Add indicator
    for (let i = 0; i < imageSprites.length; i++) {
      const circleDot = new PIXI.Graphics();
      circleDot.beginFill(0xff0000);
      circleDot.drawCircle(0, 0, 10);
      circleDot.endFill();
      circleDot.position.set(width / 2 + i * 40, height - 50);
      if (i == currentImageIndex) {
        circleDot.scale.set(1.5);
      } else {
        circleDot.scale.set(1);
      }

      this.addChild(circleDot);
    }
  }
  showPopup() {
    this.visible = true;
  }
}
