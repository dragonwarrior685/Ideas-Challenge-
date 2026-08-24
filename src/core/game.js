// Main Game Class using Phaser 3

import Phaser from 'phaser';
import CONFIG from '../../config.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.obstacles = [];
    this.skillTokens = [];
  }

  preload() {
    // Load assets here
    // this.load.image('player', 'assets/player.png');
    // this.load.image('obstacle', 'assets/obstacle.png');
  }

  create() {
    // Create physics group for obstacles
    this.obstacleGroup = this.physics.add.group();
    
    // Create player
    this.player = this.physics.add.sprite(
      CONFIG.GAME.WIDTH / 2,
      CONFIG.GAME.HEIGHT - 50,
      'player'
    );
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    
    // Camera follow player
    this.cameras.main.startFollow(this.player);
    
    // Input handling
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Spawn obstacles periodically
    this.time.addRepeatedEvent(CONFIG.RUNNER.OBSTACLE_SPAWN_RATE, () => {
      this.spawnObstacle();
    });
    
    // UI
    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '24px', fill: '#000' });
    this.scoreText.setScrollFactor(0);
  }

  update() {
    // Player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-CONFIG.PLAYER.SPEED);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(CONFIG.PLAYER.SPEED);
    } else {
      this.player.setVelocityX(0);
    }
    
    // Jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(CONFIG.PLAYER.JUMP_VELOCITY);
    }
    
    // Remove off-screen obstacles
    this.obstacleGroup.children.entries.forEach(obstacle => {
      if (obstacle.y > CONFIG.GAME.HEIGHT + 50) {
        obstacle.destroy();
      }
    });
  }

  spawnObstacle() {
    const x = Phaser.Math.Between(50, CONFIG.GAME.WIDTH - 50);
    const obstacle = this.obstacleGroup.create(x, -50, 'obstacle');
    obstacle.setVelocityY(CONFIG.RUNNER.OBSTACLE_SPEED);
  }

  addScore(points) {
    this.score += points;
    this.scoreText.setText(`Score: ${this.score}`);
  }
}

// Game Configuration
const gameConfig = {
  type: Phaser.AUTO,
  width: CONFIG.GAME.WIDTH,
  height: CONFIG.GAME.HEIGHT,
  physics: {
    default: CONFIG.GAME.PHYSICS,
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: GameScene
};

export default gameConfig;
