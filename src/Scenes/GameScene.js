import 'phaser';
var spaceField;
var backgroundV;
var player;
var cursors;
var bullets;
var bulletTime = 0;
var fireButton;

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
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'starfield')
    backgroundV = 5
    player = this.physics.add.sprite(400, 500, 'player');
    cursors = this.input.keyboard.createCursorKeys();
    this.bullets = this.add.group();
    this.bullets.children.each(function (bullet) {
      bullet.enableBody = true;
      bullet.physicsBodyType = Phaser.Physics.ARCADE
      bullet.createMultiple(30, 'bullet')
      bullet.set('anchor.x', 0.5)
      bullet.set('anchor.y', 1)
      bullet.set('outOfBoundKill', true)
      bullet.set('checkWorldBounds', true)
    }, this);
    this.fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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

    if (this.fireButton.isDown) {
      fireBullet();
    }
  }
};

const fireBullet = () => {
  if (this.time.now > this.bulletTime) {
    this.bullet = this.bullets.getFirstExists(false)
    // if (this.bullet) {
    //   this.bullet.reset(player.x + 14, player.y);
    //   this.bullet.body.velocity.y = -400
    //   this.bulletTime = this.time.now + 200;
    // }
  }
}
