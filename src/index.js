import 'phaser';
import config from './Config/config';
import WelcomeScene from './Scenes/WelcomeScene';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import OptionsScene from './Scenes/OptionsScene';
import LeaderBoardScene from './Scenes/LeaderBoardScene';
import GameOverScene from './Scenes/GameOverScene';
import CreditsScene from './Scenes/CreditsScene';
import Model from './Model';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Welcome', WelcomeScene);
    this.scene.add('Boot', BootScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Welcome');
  }
}

window.game = new Game();