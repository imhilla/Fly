import 'phaser';
var spaceField

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

    // enemies
    // this.load.image("dragonblue", 'assets/dragonblue.png');
    // this.load.image("dragonorrange", 'assets/dragonorrange.png');

    // our two characters
    // this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    // start the WorldScene
    this.spaceField = this.add.tileSprite(0, 0, 1600, 1400, 'starfield')
    // var map = this.make.tilemap({ key: 'map' });
    // var tiles = map.addTilesetImage('spritesheet', 'tiles');
    // var grass = map.createStaticLayer('Grass', tiles, 0, 0);
    // var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    // obstacles.setCollisionByExclusion([-1]);
  }

  update (){
    // this.backgound1.tilePositionX -= 0.5 //change this to a value suited for your needs change - to + to change direction

   this.spaceField.tilePositionY +=2;
  }
};
