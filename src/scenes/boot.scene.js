import { GameScene } from './game.scene.js';

export class BootScene extends Phaser.Scene {
  cursors;
  hasStarted = false;
  instructions = `Controls: LEFT (move left), RIGHT (move right), UP (jump)`;
  textStyle = {
    align: 'center',
    fixedWidth: 800,
    fixedHeight: 100,
  };

  create() {
    this.add.text(0, 100, 'Death by Squirrel', {
      fontSize: '40px',
      fill: '#FFF',
      ...this.textStyle,
    });
    this.add.text(0, 300, this.instructions, {
      fontSize: '20px',
      fill: '#FFF',
      ...this.textStyle,
    });
    this.add.text(0, 400, 'Press SPACE to start', {
      fontSize: '20px',
      fill: '#FFF',
      ...this.textStyle,
    });
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  update() {
    if (this.cursors.space.isDown && !this.hasStarted) {
      this.game.scene.add('gameScene', GameScene, true);
      this.hasStarted = true;
    }
  }
}
