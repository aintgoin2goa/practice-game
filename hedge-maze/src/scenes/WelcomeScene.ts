import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../lib/constants";
import { FONTS } from "../lib/typography";
import { COLOR_USE_CASES, colorFor } from "../lib/palette";

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super("welcome");
  }

  preload() {
    this.load.image("hedge", "img/hedge-maze.webp");
  }

  create() {
    this.add.image(WIDTH / 2, HEIGHT / 2, "hedge");
    this.add.text(50, HEIGHT / 4, "HEDGE\n MAZE", {
      fontFamily: FONTS.HachicroUndertaleBattle,
      fontSize: "128px",
      color: colorFor(COLOR_USE_CASES.TITLE).toString(),
      stroke: colorFor(COLOR_USE_CASES.TITLE_OUTLINE).toString(),
      strokeThickness: 1,
      align: "centre",
    });
    this.add
      .text(WIDTH / 2, HEIGHT - 100, " PLAY ", {
        fontFamily: FONTS.HachicroUndertaleBattle,
        fontSize: "48px",
        color: colorFor(COLOR_USE_CASES.TITLE).toString(),
        backgroundColor: colorFor(COLOR_USE_CASES.TITLE_OUTLINE).toString(),
      })
      .setPadding({ x: 24, y: 16 })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("maze");
      });
  }
}
