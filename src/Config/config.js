import 'phaser';
// import PhaserMatterCollisionPlugin from 'phaser-matter-collision-plugin';

export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }, // will affect our player sprite
      debug: false // change if you need
    }
  },
  dom: {
    createContainer: true,
  },
  // plugins: {
  //   scene: [
  //     {
  //       plugin: PhaserMatterCollisionPlugin,
  //       key: 'matterCollision',
  //       mapping: 'matterCollision',
  //     },
  //   ],
  // },
};
