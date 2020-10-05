import 'phaser';
var spaceField;
var backgroundV;
var player;
var cursors;
var bulletTime = 0;
var fireButton;
// var bullets;

// const fireBullet = () => {

// }

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('starfield', 'assets/space.png');
    this.load.image('player', 'assets/rocket.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'starfield')
    backgroundV = 5
    this.player = this.physics.add.sprite(400, 500, 'player');
    cursors = this.input.keyboard.createCursorKeys();
    // this.bullets = this.physics.add.group();
    // var bullets = this.physics.add.group({
    //   key: 'bullet',
    //   max: 30
    // });

    var bullets = this.make.group({
      key: 'bullet',
      frame: [0, 1, 2, 3, 4],
      // frameQuantity: 22,
      max: 30
    });
    bullets.physicsBodyType = Phaser.Physics.ARCADE
    bullets.enableBody = true;
    bullets.children.each(function (bullet) {
      console.log(bullet)
      // bullet.setAll('anchor.x', 0.5)
      // bullet.setAll('anchor.y', 1)
      // bullet.set('outOfBoundKill', true)
      // bullet.set('checkWorldBounds', true)
      // console.log(bullet)
    }, this);
    Phaser.Actions.GridAlign(bullets.getChildren(), {
      width: 12,
      height: 9,
      cellWidth: 64,
      cellHeight: 64,
      x: 48,
      y: 32
    });

    this.fireButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    this.spaceField.tilePositionY += backgroundV;
    this.player.body.setVelocityX(0);

    if (cursors.left.isDown) {
      this.player.body.setVelocityX(-350);
    }

    if (cursors.right.isDown) {
      this.player.body.setVelocityX(350);
    }

    if (this.fireButton.isDown) {
      this.startTime = new Date();
      if (this.startTime.getTime() > bulletTime) {
        let bullet = this.bullets.get(this.player.x, (this.player.y))
        if (bullet) {
          // console.log(bullet)
          // bullet.reset(this.player.x + 14, this.player.y);
          bullet.body.setVelocityY(-400);
          bulletTime = this.startTime.getTime() + 200;
        }
      }
    }
  }

};


