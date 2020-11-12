import { GameScene } from './game.scene.js';

export class GameOverScene extends Phaser.Scene {
  cursors;
  textStyle = {
    align: 'center',
    fixedWidth: 800,
    fixedHeight: 100,
  };

  create() {
    this.add.text(0, 100, 'You died!', {
      fontSize: '40px',
      fill: '#FFF',
      ...this.textStyle,
    });
    this.add.text(0, 400, 'Press SPACE to try again', {
      fontSize: '20px',
      fill: '#FFF',
      ...this.textStyle,
    });
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.space.isDown) {
      this.game.scene.add('gameScene', GameScene, true);
    }
  }
}
