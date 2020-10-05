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
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(-75, 350, 'ground')
    ledge.body.immovable = true

    player = this.physics.add.sprite(100, 450, 'woof');

    // physics.arcade.enable(player)

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    player.body.gravity.y = 1000

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('woof', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'woof', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('woof', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.physics.add.collider(player, platforms);

    diamonds = this.physics.add.group({
      key: 'diamond',
      repeat: 11,
      // setXY: { x: 12, y: 0, stepX: 70 }
    });

    diamonds.enableBody = true

    // diamonds.children.iterate(function (child) {
    //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    // });

    for (var i = 0; i < 12; i++) {
      const diamond = diamonds.create(i * 70, 0, 'diamond')

      //  Drop em from the sky and bounce a bit
      diamond.body.gravity.y = 1000
      diamond.body.bounce.y = 0.3 + Math.random() * 0.2
    }
    this.physics.add.collider(diamonds, platforms);

    scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#000' })

    cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    player.body.velocity.x = 0
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(diamonds, platforms)

    if (cursors.left.isDown) {
      player.setVelocityX(-160);

      player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    }
    else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-730);
    }
  }

};


