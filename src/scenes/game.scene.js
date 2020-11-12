import { GameOverScene } from './game-over.scene.js';

export class GameScene extends Phaser.Scene {
  player;
  platforms;
  coins;
  baddies;
  cursors;
  currentlyFacing = 'right';
  score = 0;
  scoreText;
  gameOver = false;
  timeLeft = 40;
  timerText;

  constructor(config) {
    super(config);
  }

  setDetaultValues() {
    this.timeLeft = 40;
    this.score = 0;
    this.currentlyFacing = 'right';
  }

  preload() {
    this.load.image('sky', 'assets/img/sky.jpg');
    this.load.image('coin', 'assets/img/coin.png');
    this.load.image('bear', 'assets/img/bear.png');
    this.load.image(
      'platform-2-tiles',
      'assets/img/platforms/platform-2-tiles.png'
    );
    this.load.image(
      'platform-3-tiles',
      'assets/img/platforms/platform-3-tiles.png'
    );
    this.load.image(
      'platform-4-tiles',
      'assets/img/platforms/platform-4-tiles.png'
    );
    this.load.image(
      'platform-5-tiles',
      'assets/img/platforms/platform-5-tiles.png'
    );
    this.load.image(
      'platform-6-tiles',
      'assets/img/platforms/platform-6-tiles.png'
    );
    this.load.image(
      'platform-7-tiles',
      'assets/img/platforms/platform-7-tiles.png'
    );
    this.load.image(
      'platform-8-tiles',
      'assets/img/platforms/platform-8-tiles.png'
    );
    this.load.image(
      'platform-9-tiles',
      'assets/img/platforms/platform-9-tiles.png'
    );
    this.load.image(
      'platform-10-tiles',
      'assets/img/platforms/platform-10-tiles.png'
    );
    this.load.image(
      'platform-25-tiles',
      'assets/img/platforms/platform-25-tiles.png'
    );

    this.load.spritesheet('dude', 'assets/img/dude/dude-sprite.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.platforms = this.physics.add.staticGroup();
    this.coins = this.physics.add.group();
    this.baddies = this.physics.add.staticGroup();

    this.addGround();
    this.addFirstPlatforms();
    this.addSecondPlatforms();
    this.addThirdPlatforms();
    this.addFourthPlatforms();

    this.createPlayer();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreText = this.add.text(620, 16, 'Coins: 0', {
      fontSize: '30px',
      fill: '#FFF',
    });
    this.timerText = this.add.text(20, 16, `Time: ${this.timeLeft}`, {
      fontSize: '30px',
      fill: '#FFF',
    });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);

    this.physics.add.overlap(
      this.player,
      this.coins,
      this.collectCoin,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.baddies,
      this.endGame.bind(this),
      null,
      this
    );

    this.gameTimeout = setTimeout(
      this.endGame.bind(this),
      (this.timeLeft + 1) * 1000
    );
    this.timerInterval = setInterval(this.updateTime.bind(this), 1000);
  }

  update() {
    if (this.gameOver) {
      return;
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-145);
      this.player.anims.play('left', true);
      this.currentlyFacing = 'left';
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(145);
      this.player.anims.play('right', true);
      this.currentlyFacing = 'right';
    } else {
      this.player.setVelocityX(0);
      if (this.currentlyFacing === 'left') {
        this.player.anims.play('idle-left');
      } else {
        this.player.anims.play('idle-right');
      }
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-205);
    }
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 500, 'dude').refreshBody();
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'idle-left',
      frames: [{ key: 'dude', frame: 6 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'idle-right',
      frames: [{ key: 'dude', frame: 7 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 13 }),
      frameRate: 10,
      repeat: -1,
    });
  }

  addGround() {
    this.platforms.create(400, 584, 'platform-25-tiles');
    this.baddies.create(400, 584 - 32, 'bear');
    this.coins.create(190, 584 - 32, 'coin');
    this.coins.create(230, 584 - 32, 'coin');
    this.coins.create(540, 584 - 32, 'coin');
    this.coins.create(500, 584 - 32, 'coin');
    this.coins.create(600, 584 - 32, 'coin');
  }

  addFirstPlatforms() {
    // Platform 1
    this.platforms.create(700, 520, 'platform-3-tiles');
    this.baddies.create(700, 520 - 32, 'bear');
    this.coins.create(670, 520 - 32, 'coin');
    this.coins.create(730, 520 - 32, 'coin');

    // Platform 2
    this.platforms.create(520, 470, 'platform-4-tiles');
    this.coins.create(520, 470 - 32, 'coin');

    // Platform 3
    this.platforms.create(370, 450, 'platform-3-tiles');
    this.coins.create(370, 450 - 32, 'coin');

    // Platform 4
    this.platforms.create(230, 479, 'platform-3-tiles');
    this.baddies.create(230, 479 - 32, 'bear');
    this.coins.create(200, 479 - 32, 'coin');
  }

  addSecondPlatforms() {
    // Platform 1
    this.platforms.create(55, 410, 'platform-3-tiles');
    this.coins.create(35, 410 - 32, 'coin');
    this.coins.create(75, 410 - 32, 'coin');

    // Platform 2
    this.platforms.create(280, 360, 'platform-5-tiles');
    this.baddies.create(235, 360 - 32, 'bear');
    this.coins.create(270, 360 - 32, 'coin');
    this.coins.create(305, 360 - 32, 'coin');
    this.coins.create(340, 360 - 32, 'coin');

    // Platform 3
    this.platforms.create(500, 370, 'platform-3-tiles');
    this.baddies.create(497, 370 - 32, 'bear');
    this.coins.create(465, 370 - 32, 'coin');
    this.coins.create(540, 370 - 32, 'coin');

    // Platform 4
    this.platforms.create(620, 350, 'platform-2-tiles');
    this.coins.create(620, 350 - 32, 'coin');
  }

  addThirdPlatforms() {
    // Platform 1
    this.platforms.create(740, 300, 'platform-2-tiles');
    this.coins.create(740, 300 - 32, 'coin');

    // Platform 2
    this.platforms.create(570, 240, 'platform-3-tiles');
    this.baddies.create(570, 240 - 32, 'bear');
    this.coins.create(530, 240 - 32, 'coin');
    this.coins.create(600, 240 - 32, 'coin');

    // Platform 3
    this.platforms.create(360, 250, 'platform-4-tiles');
    this.baddies.create(360, 250 - 32, 'bear');
    this.coins.create(310, 250 - 32, 'coin');
    this.coins.create(390, 250 - 32, 'coin');
  }

  addFourthPlatforms() {
    // Platform 1
    this.platforms.create(160, 190, 'platform-4-tiles');
    this.baddies.create(160, 190 - 32, 'bear');
    this.coins.create(125, 190 - 32, 'coin');

    // Platform 2
    this.platforms.create(320, 120, 'platform-3-tiles');
    this.baddies.create(320, 120 - 32, 'bear');
    this.coins.create(290, 120 - 32, 'coin');
    this.coins.create(350, 120 - 32, 'coin');

    // Platform 3
    this.platforms.create(500, 80, 'platform-4-tiles');
    this.coins.create(460, 80 - 32, 'coin');
    this.coins.create(500, 80 - 32, 'coin');
    this.coins.create(540, 80 - 32, 'coin');
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText('Coins: ' + this.score);
  }

  endGame() {
    this.killPlayer();
    this.gameOver = true;
    clearInterval(this.timerInterval);
    this.showYouDiedMessage();
  }

  killPlayer() {
    this.player.setTint(0xff0000);
    setTimeout(this.playerIdle.bind(this), 0);
  }

  updateTime() {
    this.timeLeft--;
    this.timerText.setText('Time: ' + this.timeLeft);
  }

  playerIdle() {
    if (this.currentlyFacing === 'left') {
      this.player.anims.play('idle-left');
    } else {
      this.player.anims.play('idle-right');
    }
  }

  restart() {
    this.gameOver = false;
    this.setDetaultValues();
    clearInterval(this.timerInterval);
    clearTimeout(this.gameTimeout);
    this.scene.restart();
  }

  showYouDiedMessage() {
    this.game.scene.add('gameOverScene', GameOverScene, true);
  }
}
