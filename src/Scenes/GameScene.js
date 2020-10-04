import 'phaser';
var spaceField;
var backgroundV;
var player;
var cursors;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // load images
    // this.load.image('logo', 'assets/logo.png');
    // map tiles
    // this.load.image('tiles', 'assets/map/spritesheet.png');

    // map in json format
    // this.load.tilemapTiledJSON('map', 'assets/map/map.json');

    this.load.image('starfield', 'assets/space.png');
    this.load.image('player', 'assets/rocket.png');

  }

  create() {
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'starfield')
    backgroundV = 5
    player = this.physics.add.sprite(400, 500, 'player');
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;
  }

  update() {
    this.spaceField.tilePositionY += backgroundV;
    player.body.setVelocityX(0);

    if (cursors.left.isDown) {
      player.body.setVelocityX(-350);
    }

    if (cursors.right.isDown) {
      player.body.setVelocityX(350);
    }
  }
};
