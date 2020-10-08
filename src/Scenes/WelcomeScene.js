/* eslint-disable camelcase */
import Phaser from 'phaser';
import blue_button02 from './asset/blue_button02.png';

export default class WelcomeScene extends Phaser.Scene {
  constructor() {
    super('Welcome');
  }

  create() {
    this.textInstructions = this.add.text(
      50,
      270,
      `Hello there welcome to Fly. Enjoy while trying not to run out of fuel`,
      { fontSize: 18 },
    );

    this.intro = this.add.text(215, 400, 'Enter your name: ', {
      fontSize: 20,
      fontFamily: 'monospace',
    });

    const input = this.add.dom(480, 410, 'input', {
      type: 'text',
      name: 'nameField',
      fontSize: '32px',
      backgroundColor: '#fff',
    });
    input.scaleX = 0.4;
    input.scaleY = 0.6;

    const style = `background: url(${blue_button02}); cursor:pointer; color:#fff`;
    const gameButton = this.add.dom(590, 412, 'button', style, 'Play');
    gameButton.scaleX = 1.5;
    gameButton.scaleY = 1.7;
    gameButton.addListener('click');

    gameButton.on('click', () => {
      if (input.node.value) {
        this.model = this.sys.game.globals.model;
        this.model.userName = input.node.value;
        this.scene.start('Boot');
      }
    });
  }
}
