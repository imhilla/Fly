// import Phaser from 'phaser';
// // import Player from '../Classes/Player';
// // import Resource from '../Classes/Resource';
// // import Enemy from '../Classes/Enemy';
// // import LocalStorage from '../Objects/LocalStorage';
// // import tiles from '../assets/images/IceTileset-extruded.png';
// import map from '../assets/map/map.json';
// import sprite from 'assets/map/spritesheet.png' 
// import  from '../assets/dragonblue.png'
// import blue2 from '../assets/ui/blue_button03.png'
// import phaserlogo from '../assets/logo.png'
// import box from '../assets/ui/grey_box.png'
// import checked from '../assets/ui/blue_boxCheckmark.png'

// export default class MainScene extends Phaser.Scene {
//   constructor() {
//     super('Main');
//     // this.enemies = [];
//   }

//   preload() {
//     // map tiles
//     this.load.image('tiles', sprite);

//     // map in json format
//     this.load.tilemapTiledJSON('map', map);

//     // enemies
//     this.load.image("dragonblue", "assets/dragonblue.png");
//     this.load.image("dragonorrange", "assets/dragonorrange.png");

//     // our two characters
//     this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
//   }

//   create() {
//     // start the WorldScene
//     this.scene.start('WorldScene');
//   }

//   // create() {
//   //   localStorage.setItem('score', 0);
//   //   const map = this.make.tilemap({ key: 'map' });
//   //   this.map = map;
//   //   const tileset = map.addTilesetImage('IceTileset', 'tiles', 32, 32, 1, 2);
//   //   const layer1 = map.createStaticLayer('Tile Layer 1', tileset, 0, 0);
//   //   layer1.setCollisionByProperty({ collides: true });
//   //   this.matter.world.convertTilemapLayer(layer1);

//   //   this.map
//   //     .getObjectLayer('Resources')
//   //     .objects.forEach((resource) => new Resource({ scene: this, resource }));
//   //   this.map
//   //     .getObjectLayer('Enemies')
//   //     .objects.forEach((enemy) => this.enemies.push(new Enemy({ scene: this, enemy })));

//   //   this.player = new Player({
//   //     scene: this,
//   //     x: 350,
//   //     y: 220,
//   //     texture: 'princess',
//   //     frame: 'princess_idle_1',
//   //   });
//   //   // this.player.health = 2
//   //   // this.player.dead = false

//   //   this.player.inputKeys = this.input.keyboard.addKeys({
//   //     up: Phaser.Input.Keyboard.KeyCodes.UP,
//   //     down: Phaser.Input.Keyboard.KeyCodes.DOWN,
//   //     left: Phaser.Input.Keyboard.KeyCodes.LEFT,
//   //     right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
//   //     space: Phaser.Input.Keyboard.KeyCodes.SPACE,
//   //   });
//   //   const camera = this.cameras.main;
//   //   camera.zoom = 2;
//   //   camera.startFollow(this.player);
//   //   camera.setLerp(0.1, 0.1);
//   //   camera.setBounds(0, 0, this.game.config.width, this.game.config.height);

//   //   this.scoreText = this.add
//   //     .text(200, 150, `Score: ${LocalStorage.readLocalStorage()}`, {
//   //       fontSize: '20px',
//   //       fill: '#000',
//   //     })
//   //     .setScrollFactor(0)
//   //     .setDepth(100);
//   // }

//   update() {
//     this.player.update();
//     this.enemies.forEach((enemy) => enemy.update());
//     this.scoreText.setText(`Score: ${LocalStorage.readLocalStorage()}`);
//   }
// }
// var WorldScene = new Phaser.Class({

//   Extends: Phaser.Scene,

//   initialize:

//     function WorldScene() {
//       Phaser.Scene.call(this, { key: 'WorldScene' });
//     },

//   preload: function () {

//   },

//   create: function () {
//     // create the map
//     var map = this.make.tilemap({ key: 'map' });

//     // first parameter is the name of the tilemap in tiled
//     var tiles = map.addTilesetImage('spritesheet', 'tiles');

//     // creating the layers
//     var grass = map.createStaticLayer('Grass', tiles, 0, 0);
//     var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);

//     // make all tiles in obstacles collidable
//     obstacles.setCollisionByExclusion([-1]);

//     //  animation with key 'left', we don't need left and right as we will use one and flip the sprite
//     this.anims.create({
//       key: 'left',
//       frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
//       frameRate: 10,
//       repeat: -1
//     });

//     // animation with key 'right'
//     this.anims.create({
//       key: 'right',
//       frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
//       frameRate: 10,
//       repeat: -1
//     });
//     this.anims.create({
//       key: 'up',
//       frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14] }),
//       frameRate: 10,
//       repeat: -1
//     });
//     this.anims.create({
//       key: 'down',
//       frames: this.anims.generateFrameNumbers('player', { frames: [0, 6, 0, 12] }),
//       frameRate: 10,
//       repeat: -1
//     });

//     // our player sprite created through the phycis system
//     this.player = this.physics.add.sprite(50, 100, 'player', 6);

//     // don't go out of the map
//     this.physics.world.bounds.width = map.widthInPixels;
//     this.physics.world.bounds.height = map.heightInPixels;
//     this.player.setCollideWorldBounds(true);

//     // don't walk on trees
//     this.physics.add.collider(this.player, obstacles);

//     // limit camera to map
//     this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
//     this.cameras.main.startFollow(this.player);
//     this.cameras.main.roundPixels = true; // avoid tile bleed

//     // user input
//     this.cursors = this.input.keyboard.createCursorKeys();

//     // where the enemies will be
//     this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });
//     for (var i = 0; i < 30; i++) {
//       var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
//       var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);
//       // parameters are x, y, width, height
//       this.spawns.create(x, y, 20, 20);
//     }
//     // add collider
//     this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);
//     // we listen for 'wake' event
//     this.sys.events.on('wake', this.wake, this);
//   },
//   wake: function () {
//     this.cursors.left.reset();
//     this.cursors.right.reset();
//     this.cursors.up.reset();
//     this.cursors.down.reset();
//   },
//   onMeetEnemy: function (player, zone) {
//     // we move the zone to some other location
//     zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
//     zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

//     // shake the world
//     this.cameras.main.shake(300);

//     this.input.stopPropagation();
//     // start battle 
//     this.scene.switch('BattleScene');
//   },
//   update: function (time, delta) {
//     this.player.body.setVelocity(0);

//     // Horizontal movement
//     if (this.cursors.left.isDown) {
//       this.player.body.setVelocityX(-80);
//     }
//     else if (this.cursors.right.isDown) {
//       this.player.body.setVelocityX(80);
//     }
//     // Vertical movement
//     if (this.cursors.up.isDown) {
//       this.player.body.setVelocityY(-80);
//     }
//     else if (this.cursors.down.isDown) {
//       this.player.body.setVelocityY(80);
//     }

//     // Update the animation last and give left/right animations precedence over up/down animations
//     if (this.cursors.left.isDown) {
//       this.player.anims.play('left', true);
//       this.player.flipX = true;
//     }
//     else if (this.cursors.right.isDown) {
//       this.player.anims.play('right', true);
//       this.player.flipX = false;
//     }
//     else if (this.cursors.up.isDown) {
//       this.player.anims.play('up', true);
//     }
//     else if (this.cursors.down.isDown) {
//       this.player.anims.play('down', true);
//     }
//     else {
//       this.player.anims.stop();
//     }
//   }
// });
