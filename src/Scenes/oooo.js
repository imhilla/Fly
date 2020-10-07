import 'phaser';
import GameOverScene from './GameOverScene';
import LocalStorage from '../Objects/LocalStorage';

let score = 0
let scoreText
let platforms
let diamonds
let cursors
let player
let spaceField
let youWin

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    this.load.image('bomb', './assets/bomb.png')
    this.load.image('ground', './assets/platform.png')
    this.load.image('diamond', './assets/apple.png')
    this.load.image('sky', 'assets/space.png');
    this.load.spritesheet('woof',
      './assets/woof.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }

  create() {
    localStorage.setItem('score', 0);
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'sky')
    platforms = this.physics.add.staticGroup();
    platforms.enableBody = true
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    let ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    player = this.physics.add.sprite(100, 450, 'woof');

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
    });

    diamonds.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    for (var i = 0; i < 12; i++) {
      const diamond = diamonds.create(i * 70, 0, 'diamond')
      diamond.body.gravity.y = 1000
      diamond.body.bounce.y = 0.3 + Math.random() * 0.2
    }

    this.physics.add.collider(diamonds, platforms);
    this.scoreText = this.add.text(16, 16, `Score: ${LocalStorage.readLocalStorage()}`, { fontSize: '32px', fill: '#FFF' })
    cursors = this.input.keyboard.createCursorKeys();

    var bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.scoreText = this.add
      .text(200, 150, `Score: ${LocalStorage.readLocalStorage()}`, {
        fontSize: '20px',
        fill: '#000',
      })
      .setScrollFactor(0)
      .setDepth(100);
  }

  update() {
    this.spaceField.tilePositionY += 2;

    this.physics.add.overlap(player, diamonds, collectDiamond, null, this);

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

    if (score === 120) {
      // alert('You win!')
      // score = 0
      this.scene.start('GameOver');
    }
  }
};

function collectDiamond(player, diamond) {
  diamond.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (diamonds.countActive(true) === 0) {
    diamonds.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}