import 'phaser';
// var spaceField;
// var backgroundV;
// var player;
// var cursors;
// var bulletTime = 0;
// var fireButton;

let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('sky', './assets/sky.png')
    this.load.image('ground', './assets/platform.png')
    this.load.image('diamond', './assets/diamond.png')
    // this.load.spritesheet('woof', './assets/woof.png')
    this.load.spritesheet('woof',
      './assets/woof.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    this.add.sprite(400, 300, 'sky')
    platforms = this.physics.add.staticGroup();
    platforms.enableBody = true
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    // platforms.create(750, 220, 'ground');

    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(-75, 350, 'ground')
    ledge.body.immovable = true

    player = this.physics.add.sprite(100, 450, 'woof');
    // game.physics.arcade.enable(player)
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    player.body.gravity.y = 800
  

  }

  update() {

  }

};


