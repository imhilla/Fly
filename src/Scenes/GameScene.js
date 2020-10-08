/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars, prefer-destructuring */

import Phaser from 'phaser';
import LocalStorage from '../Objects/LocalStorage';
import Counter from '../Objects/counter';

let score = 0;
let platforms;
let apples;
let cursors;
let sprite;
let counter = 1000;

var startedEating = false;
function collectApple(sprite, apple) {
  apple.disableBody(true, true);
  startedEating = true;
  score += 10;
  this.scoreText.setText(`Score: ${score}`);
  if (apples.countActive(true) === 0) {
    apples.children.iterate((child) => {
      child.enableBody(true, child.x, 0, true, true);
    });
  }
}

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('tiles', './assets/cybernoid.png', 16, 16);
    this.load.image('phaser', 'assets/phaser-ship.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('apple', './assets/apple.png');
    this.load.image('sky', 'assets/space.png');
    this.load.spritesheet('woof',
      './assets/woof.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'sky');
    sprite = this.physics.add.sprite(300, 500, 'phaser');
    sprite.setBounce(0.2);
    sprite.setCollideWorldBounds(true);
    localStorage.setItem('score', 0);
    localStorage.setItem('counter', 1000);
    platforms = this.physics.add.staticGroup();
    platforms.enableBody = true;
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    const ledge = platforms.create(400, 450, 'ground');
    ledge.body.immovable = true;
    this.physics.add.collider(sprite, platforms);
    apples = this.physics.add.group({
      key: 'apple',
      repeat: 40,
    });
    
    for (var i = 0; i < 12; i += 1) {
      const apple = apples.create(i * 70, 0, 'apple');
      apple.body.gravity.y = 1000;
      apple.body.bounce.y = 0.3 + Math.random() * 0.5;
      apple.body.velocity.setTo(1200, 400);
      apple.body.collideWorldBounds = true;
      apple.body.bounce.set(0.9);
      apple.body.gravity.set(0, 180);
    }
    this.physics.add.collider(apples, platforms);
    this.scoreText = this.add.text(16, 16, `Score: ${LocalStorage.readLocalStorage()}`, { fontSize: '32px', fill: '#FFF' });
    this.timeLeft = this.add.text(20, 100, `Fuel left: ${Counter.getCounter()}`, { fontSize: '32px', fill: '#FFF' });
    cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    var eating = false;
    this.spaceField.tilePositionY += 2;
    sprite.body.setVelocityX(0);
    sprite.body.setVelocityY(0);

    if (cursors.up.isDown) {
      eating = true;
      sprite.body.setVelocityY(-200);
    }

    else if (cursors.down.isDown) {
      eating === true;
      sprite.body.setVelocityY(200);
    }

    if (cursors.left.isDown) {
      eating = true;
      sprite.body.setVelocityX(-200);
    }
    else if (cursors.right.isDown) {
      eating = true;
      sprite.body.setVelocityX(200);
    }

    this.physics.add.overlap(sprite, apples, collectApple, null, this);

    if (counter === 0) {
      this.scene.start('GameOver');
    }
    if (eating === true) {
      counter -= 1;
      this.timeLeft.setText(`Fuel left: ${counter}`);
    }
    if (counter === 0) {
      this.scoreText.setText(`Score: ${LocalStorage.saveLocalStorage(score)}`);
      this.scene.start('GameOver');
    }
  }
};

