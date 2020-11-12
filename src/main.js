import * as Phaser from 'phaser';
import { config } from './modules/config.js';
import { BootScene } from './scenes/boot.scene.js';

var game = new Phaser.Game(config);

game.scene.add('bootScene', BootScene, true);