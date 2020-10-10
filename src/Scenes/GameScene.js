/* eslint-disable func-names */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars, prefer-destructuring */
/* eslint no-var: off */

import Phaser from 'phaser';
import LocalStorage from '../Objects/LocalStorage';
import Counter from '../Objects/counter';

let score = 0;
let platforms;
let apples;
let cursors;
let sprite;
let counter = 1000;
let mets;

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
    this.load.image('met', './assets/met.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('apple', './assets/apple.png');
    this.load.image('sky', 'assets/space.png');
    this.load.spritesheet('woof', './assets/woof.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    var i;
    var j;
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'sky');
    sprite = this.physics.add.sprite(300, 500, 'phaser');
    sprite.setBounce(0.2);
    sprite.setCollideWorldBounds(true);
    localStorage.setItem('score', 0);
    localStorage.setItem('counter', 1000);
    platforms = this.physics.add.staticGroup();
    platforms.enableBody = true;
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.physics.add.collider(sprite, platforms);
    apples = this.physics.add.group({
      key: 'apple',
      repeat: 70,
    });

    for (i = 0; i < 12; i += 1) {
      const apple = apples.create(i * 70, 0, 'apple');
      apple.body.gravity.y = 1000;
      apple.body.bounce.y = 0.3 + Math.random() * 0.5;
      apple.body.velocity.setTo(100, 400);
      apple.setCollideWorldBounds(true);
      apple.body.bounce.set(0.9);
      apple.body.gravity.set(0, 180);
    }
    mets = this.physics.add.group({
      key: 'met',
      repeat: 4,
    });

    for (j = 0; j < 3; j += 1) {
      const met = mets.create(j * 70, 0, 'met');
      met.body.gravity.y = 5000;
      met.body.bounce.y = 0.3 + Math.random() * 0.5;
      met.body.velocity.setTo(1200, 400);
      met.body.collideWorldBounds = true;
      met.body.bounce.set(0.9);
      met.body.gravity.set(0, 100);
    }

    this.physics.add.collider(apples, platforms);
    this.physics.add.collider(mets, apples);
    this.physics.add.collider(mets, mets);
    this.physics.add.collider(mets, platforms);
    this.physics.add.collider(mets, sprite);
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
    } else if (cursors.down.isDown) {
      eating === true;
      sprite.body.setVelocityY(200);
    }

    if (cursors.left.isDown) {
      eating = true;
      sprite.body.setVelocityX(-200);
    } else if (cursors.right.isDown) {
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
}