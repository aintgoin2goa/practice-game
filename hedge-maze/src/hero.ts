import { Physics, Scene, Types } from "phaser";
import { Target } from "./target";

const TEXTURE = "hero";
const FILE = "sprites/astronaut.png";
const FRAME_SIZE = 320;
const SPRITE_SIZE = {
  x: 220,
  y: 270,
};
const SPEED = 400;

enum Animations {
  WALK = "walk",
  JUMP = "jump",
}

export class Hero extends Physics.Arcade.Sprite {
  scene: Scene;
  keys: Types.Input.Keyboard.CursorKeys;
  target: Target;

  constructor(scene: Scene, x: number, y: number, target: Target) {
    super(scene, x, y, TEXTURE, 0);
    this.target = target;
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    // this.getBody().setCollideWorldBounds(true);
    this.getBody().setSize(SPRITE_SIZE.x, SPRITE_SIZE.y);
    this.setupKeys();
    this.setupAnimations();
  }

  static load(scene: Scene) {
    scene.load.spritesheet(TEXTURE, FILE, {
      frameWidth: FRAME_SIZE,
      frameHeight: FRAME_SIZE,
    });
  }

  setupKeys() {
    this.keys = this.scene.input.keyboard!.createCursorKeys()!;
  }

  setupAnimations() {
    this.scene.anims.create({
      key: Animations.WALK,
      frameRate: 8,
      frames: this.scene.anims.generateFrameNumbers(TEXTURE, {
        start: 0,
        end: 7,
      }),
      repeat: -1,
    });
    this.scene.anims.create({
      key: Animations.JUMP,
      frameRate: 8,
      frames: this.scene.anims.generateFrameNumbers(TEXTURE, {
        start: 8,
        end: 12,
      }),
    });
  }

  updateRotation() {
    this.rotation = this.getBody().angle;
  }

  update() {
    let isWalking = false;
    this.getBody().setVelocity(0);

    if (this.keys.up.isDown) {
      this.getBody().velocity.y = -SPEED;
      this.updateRotation();
      isWalking = true;
    }
    if (this.keys.down.isDown) {
      this.getBody().velocity.y = SPEED;
      this.updateRotation();
      isWalking = true;
    }
    if (this.keys.right.isDown) {
      this.getBody().velocity.x = SPEED;
      this.updateRotation();
      isWalking = true;
    }
    if (this.keys.left.isDown) {
      this.getBody().velocity.x = -SPEED;
      this.updateRotation();
      isWalking = true;
    }

    if (isWalking) {
      this.play(Animations.WALK, true);
    } else {
      this.stop();
    }
  }

  hasReachedTarget() {
    this.stop();
    this.play(Animations.JUMP);
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body;
  }
}
