import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    // Loading bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0x00ff00, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
    });
  }

  create() {
    this.scene.start('MenuScene');
  }
}

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background gradient simulation
    this.add.rectangle(width / 2, height / 2, width, height, 0x667eea);

    // Title
    this.add.text(width / 2, 100, 'MOANA PATHWAYS', {
      fontSize: '48px',
      fontStyle: 'bold',
      fill: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    // Subtitle
    this.add.text(width / 2, 160, '🌊 A Game for Future Leaders 🌊', {
      fontSize: '24px',
      fill: '#f0f0f0',
      align: 'center',
    }).setOrigin(0.5);

    // Play Button
    const playButton = this.add
      .rectangle(width / 2, 300, 200, 60, 0xff6b9d)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, 300, 'PLAY GAME', {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    playButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    playButton.on('pointerover', () => {
      playButton.setFillStyle(0xff85b8);
    });

    playButton.on('pointerout', () => {
      playButton.setFillStyle(0xff6b9d);
    });

    // Mentorship Button
    const mentorButton = this.add
      .rectangle(width / 2, 400, 200, 60, 0x764ba2)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, 400, 'FIND MENTOR 🤝', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    mentorButton.on('pointerdown', () => {
      this.scene.start('MentorScene');
    });

    mentorButton.on('pointerover', () => {
      mentorButton.setFillStyle(0x8a5ab8);
    });

    mentorButton.on('pointerout', () => {
      mentorButton.setFillStyle(0x764ba2);
    });

    // Career Quiz Button
    const quizButton = this.add
      .rectangle(width / 2, 500, 200, 60, 0xf77f00)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, 500, 'CAREER QUIZ 🧭', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    quizButton.on('pointerdown', () => {
      this.scene.start('QuizScene');
    });

    quizButton.on('pointerover', () => {
      quizButton.setFillStyle(0xf79d1f);
    });

    quizButton.on('pointerout', () => {
      quizButton.setFillStyle(0xf77f00);
    });

    // Footer
    this.add.text(width / 2, height - 30, 'For Māori & Pacific Girls | Inspiring Future Leaders', {
      fontSize: '14px',
      fill: '#e0e0e0',
      align: 'center',
    }).setOrigin(0.5);
  }
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.score = 0;
    this.level = 1;
    this.gameOver = false;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x87ceeb);

    // Ground
    this.ground = this.physics.add.staticGroup();
    const groundSprite = this.add.rectangle(width / 2, height - 20, width, 40, 0x90ee90);
    this.ground.add(groundSprite);

    // Player (pink rectangle with label)
    this.player = this.physics.add.sprite(width / 2, height - 100);
    const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    playerGraphics.fillStyle(0xff6b9d, 1);
    playerGraphics.fillRect(0, 0, 40, 60);
    playerGraphics.generateTexture('playerTexture', 40, 60);
    playerGraphics.destroy();
    
    this.player.setTexture('playerTexture');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // Obstacles group
    this.obstacles = this.physics.add.group();

    // Skill tokens group
    this.tokens = this.physics.add.group();

    // UI
    this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 10, y: 5 },
    });
    this.scoreText.setScrollFactor(0);

    this.levelText = this.add.text(width - 150, 10, `Level: ${this.level}`, {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 10, y: 5 },
    });
    this.levelText.setScrollFactor(0);

    // Instructions
    this.add.text(width / 2, height - 50, 'ARROW KEYS or SPACE to JUMP | Avoid RED | Collect GOLD', {
      fontSize: '14px',
      fill: '#000000',
      backgroundColor: '#ffffff',
      align: 'center',
      padding: { x: 10, y: 5 },
    }).setOrigin(0.5).setScrollFactor(0);

    // Input
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown-SPACE', () => this.jump());

    // Back to menu button
    const backButton = this.add
      .rectangle(width - 50, 30, 80, 30, 0x666666)
      .setInteractive({ useHandCursor: true })
      .setScrollFactor(0);
    this.add.text(width - 50, 30, 'MENU', {
      fontSize: '14px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5).setScrollFactor(0);

    backButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });

    // Spawn obstacles
    this.spawnTimer = this.time.addRepeatedEvent(2000 - this.level * 100, () => {
      this.spawnObstacle();
    });

    // Spawn tokens
    this.tokenTimer = this.time.addRepeatedEvent(3000, () => {
      this.spawnToken();
    });

    // Collisions
    this.physics.add.collider(this.player, this.ground);
    this.physics.add.overlap(this.player, this.obstacles, () => this.hitObstacle());
    this.physics.add.overlap(this.player, this.tokens, (player, token) => this.collectToken(token));
  }

  jump() {
    if (this.player.body.touching.down) {
      this.player.setVelocityY(-400);
    }
  }

  spawnObstacle() {
    const width = this.cameras.main.width;
    const x = Phaser.Math.Between(50, width - 50);
    
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xff0000, 1);
    graphics.fillRect(0, 0, 40, 40);
    graphics.generateTexture('obstacleTexture', 40, 40);
    graphics.destroy();
    
    const obstacle = this.obstacles.create(x, -30, 'obstacleTexture');
    obstacle.setVelocityY(200 + this.level * 30);
    obstacle.body.onWorldBounds = true;
    
    this.physics.world.once('worldbounds', (body) => {
      if (body.gameObject === obstacle) {
        obstacle.destroy();
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.score % 100 === 0) {
          this.level += 1;
          this.levelText.setText(`Level: ${this.level}`);
        }
      }
    });
  }

  spawnToken() {
    const width = this.cameras.main.width;
    const x = Phaser.Math.Between(50, width - 50);
    
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xffd700, 1);
    graphics.fillRect(0, 0, 20, 20);
    graphics.generateTexture('tokenTexture', 20, 20);
    graphics.destroy();
    
    const token = this.tokens.create(x, -20, 'tokenTexture');
    token.setVelocityY(150);
  }

  collectToken(token) {
    token.destroy();
    this.score += 50;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  hitObstacle() {
    if (!this.gameOver) {
      this.gameOver = true;
      this.spawnTimer.remove();
      this.tokenTimer.remove();

      const width = this.cameras.main.width;
      const height = this.cameras.main.height;

      this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setAlpha(0.7).setScrollFactor(0);
      this.add.text(width / 2, height / 2 - 80, 'GAME OVER', {
        fontSize: '48px',
        fontStyle: 'bold',
        fill: '#ffffff',
      }).setOrigin(0.5).setScrollFactor(0);

      this.add.text(width / 2, height / 2, `Final Score: ${this.score}`, {
        fontSize: '32px',
        fill: '#ffffff',
      }).setOrigin(0.5).setScrollFactor(0);

      const restartButton = this.add
        .rectangle(width / 2 - 90, height / 2 + 80, 150, 50, 0x00ff00)
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0);
      this.add.text(width / 2 - 90, height / 2 + 80, 'RESTART', {
        fontSize: '24px',
        fontStyle: 'bold',
        fill: '#000000',
      }).setOrigin(0.5).setScrollFactor(0);

      restartButton.on('pointerdown', () => {
        this.scene.restart();
      });

      const menuButton = this.add
        .rectangle(width / 2 + 90, height / 2 + 80, 150, 50, 0x666666)
        .setInteractive({ useHandCursor: true })
        .setScrollFactor(0);
      this.add.text(width / 2 + 90, height / 2 + 80, 'MENU', {
        fontSize: '24px',
        fontStyle: 'bold',
        fill: '#ffffff',
      }).setOrigin(0.5).setScrollFactor(0);

      menuButton.on('pointerdown', () => {
        this.scene.start('MenuScene');
      });
    }
  }

  update() {
    if (this.gameOver) return;

    // Player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(300);
    } else {
      this.player.setVelocityX(0);
    }
  }
}

class MentorScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MentorScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x764ba2);

    // Title
    this.add.text(width / 2, 50, 'FIND YOUR MENTOR 🤝', {
      fontSize: '36px',
      fontStyle: 'bold',
      fill: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    // Sample mentors
    const mentors = [
      { name: 'Kahu - Environmental Guardian', desc: 'Marine conservation & advocacy', color: 0x00aa88 },
      { name: 'Aroha - Designer & Artist', desc: 'Creative expression & branding', color: 0xff6b9d },
      { name: 'Malia - Tech Founder', desc: 'Startups & software development', color: 0x00ccff },
    ];

    let yPos = 150;
    mentors.forEach((mentor, index) => {
      const card = this.add.rectangle(width / 2, yPos, width - 60, 80, mentor.color);
      card.setInteractive({ useHandCursor: true });
      card.on('pointerover', () => card.setAlpha(0.9));
      card.on('pointerout', () => card.setAlpha(1));
      card.on('pointerdown', () => {
        this.showMentorProfile(mentor);
      });

      this.add.text(width / 2 - 250, yPos - 20, mentor.name, {
        fontSize: '20px',
        fontStyle: 'bold',
        fill: '#ffffff',
      });

      this.add.text(width / 2 - 250, yPos + 20, mentor.desc, {
        fontSize: '14px',
        fill: '#f0f0f0',
      });

      this.add.text(width / 2 + 200, yPos, 'CONNECT →', {
        fontSize: '16px',
        fontStyle: 'bold',
        fill: '#ffffff',
      });

      yPos += 120;
    });

    // Back button
    const backButton = this.add
      .rectangle(50, height - 30, 80, 30, 0x666666)
      .setInteractive({ useHandCursor: true });
    this.add.text(50, height - 30, 'BACK', {
      fontSize: '14px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    backButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }

  showMentorProfile(mentor) {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Overlay
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000).setAlpha(0.7);
    overlay.setInteractive();

    // Profile card
    this.add.rectangle(width / 2, height / 2, 500, 400, 0xffffff);

    this.add.text(width / 2, height / 2 - 150, mentor.name, {
      fontSize: '24px',
      fontStyle: 'bold',
      fill: '#000000',
      align: 'center',
    }).setOrigin(0.5).setWordWrapWidth(400);

    this.add.text(width / 2, height / 2 - 80, mentor.desc, {
      fontSize: '16px',
      fill: '#333333',
      align: 'center',
    }).setOrigin(0.5).setWordWrapWidth(400);

    this.add.text(width / 2, height / 2, '⭐ 4.8/5 Rating\n89 Mentees Helped\n24hr Response Time', {
      fontSize: '14px',
      fill: '#666666',
      align: 'center',
    }).setOrigin(0.5);

    // Connect button
    const connectBtn = this.add
      .rectangle(width / 2 - 100, height / 2 + 130, 100, 40, 0x00aa88)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2 - 100, height / 2 + 130, 'CONNECT', {
      fontSize: '14px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    connectBtn.on('pointerdown', () => {
      this.add.text(width / 2, height / 2 - 150, '✓ REQUEST SENT!', {
        fontSize: '28px',
        fontStyle: 'bold',
        fill: '#00aa00',
      }).setOrigin(0.5);
      
      this.time.delayedCall(1500, () => {
        this.scene.start('MenuScene');
      });
    });

    // Close button
    const closeBtn = this.add
      .rectangle(width / 2 + 100, height / 2 + 130, 100, 40, 0x666666)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2 + 100, height / 2 + 130, 'CLOSE', {
      fontSize: '14px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    closeBtn.on('pointerdown', () => {
      overlay.destroy();
      this.children.list.slice(-10).forEach(child => child.destroy());
    });
  }
}

class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuizScene' });
    this.currentQuestion = 0;
    this.scores = { arts: 0, tech: 0, health: 0, business: 0, environment: 0 };
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0xf77f00);

    // Title
    this.add.text(width / 2, 40, 'CAREER DISCOVERY QUIZ 🧭', {
      fontSize: '32px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    const questions = [
      {
        text: 'What excites you most?',
        answers: [
          { text: 'Creating & designing', field: 'arts' },
          { text: 'Building & coding', field: 'tech' },
          { text: 'Helping others', field: 'health' },
          { text: 'Leading & innovating', field: 'business' },
        ],
      },
      {
        text: 'Your ideal weekend:',
        answers: [
          { text: 'Artistic projects', field: 'arts' },
          { text: 'Learning new tech', field: 'tech' },
          { text: 'Volunteering', field: 'health' },
          { text: 'Starting a new venture', field: 'business' },
        ],
      },
      {
        text: 'What frustrates you?',
        answers: [
          { text: 'Lack of creativity', field: 'arts' },
          { text: 'Inefficient systems', field: 'tech' },
          { text: 'Preventable suffering', field: 'health' },
          { text: 'Missed opportunities', field: 'business' },
        ],
      },
    ];

    const q = questions[this.currentQuestion];

    // Question
    this.add.text(width / 2, 120, q.text, {
      fontSize: '28px',
      fontStyle: 'bold',
      fill: '#ffffff',
      align: 'center',
    }).setOrigin(0.5).setWordWrapWidth(500);

    // Progress
    this.add.text(width / 2, height - 40, `Question ${this.currentQuestion + 1} of ${questions.length}`, {
      fontSize: '16px',
      fill: '#ffffff',
    }).setOrigin(0.5);

    let yPos = 250;
    q.answers.forEach((answer) => {
      const btn = this.add
        .rectangle(width / 2, yPos, 400, 50, 0xff6b9d)
        .setInteractive({ useHandCursor: true });
      this.add.text(width / 2, yPos, answer.text, {
        fontSize: '16px',
        fontStyle: 'bold',
        fill: '#ffffff',
      }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        this.scores[answer.field] += 1;
        this.currentQuestion += 1;

        if (this.currentQuestion >= questions.length) {
          this.showResults();
        } else {
          this.scene.restart();
        }
      });

      btn.on('pointerover', () => btn.setAlpha(0.9));
      btn.on('pointerout', () => btn.setAlpha(1));

      yPos += 80;
    });
  }

  showResults() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Get top career
    let topCareer = Object.keys(this.scores).reduce((a, b) =>
      this.scores[a] > this.scores[b] ? a : b
    );

    const careerMap = {
      arts: '🎨 Artist & Designer',
      tech: '💻 Tech Innovator',
      health: '🏥 Healthcare Hero',
      business: '📊 Business Leader',
      environment: '🌍 Environmental Champion',
    };

    // Clear scene
    this.children.removeAll();

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x667eea);

    // Results
    this.add.text(width / 2, 80, 'YOUR CAREER PATH', {
      fontSize: '36px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, 160, careerMap[topCareer], {
      fontSize: '48px',
      fontStyle: 'bold',
      fill: '#ffff00',
    }).setOrigin(0.5);

    this.add.text(width / 2, 280, 'Recommended Mentors:', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#ffffff',
    }).setOrigin(0.5);

    this.add.text(width / 2, 340, '✨ Malia - Tech\n✨ Aroha - Arts\n✨ Kahu - Environment', {
      fontSize: '16px',
      fill: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    this.add.text(width / 2, 450, 'Go to "FIND MENTOR" to connect!', {
      fontSize: '14px',
      fill: '#ffff00',
      align: 'center',
      fontStyle: 'italic',
    }).setOrigin(0.5);

    // Back button
    const backBtn = this.add
      .rectangle(width / 2, height - 80, 150, 50, 0x00ff00)
      .setInteractive({ useHandCursor: true });
    this.add.text(width / 2, height - 80, 'BACK', {
      fontSize: '20px',
      fontStyle: 'bold',
      fill: '#000000',
    }).setOrigin(0.5);

    backBtn.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}

// Phaser Game Config
const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [BootScene, MenuScene, GameScene, MentorScene, QuizScene],
  render: {
    pixelArt: false,
    antialias: true,
  },
};

const game = new Phaser.Game(config);
