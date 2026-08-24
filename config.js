// Game Configuration

const CONFIG = {
  // Game Settings
  GAME: {
    WIDTH: 1024,
    HEIGHT: 768,
    FPS: 60,
    PHYSICS: 'arcade'
  },

  // Player Settings
  PLAYER: {
    SPEED: 200,
    JUMP_VELOCITY: -400,
    SCALE: 2
  },

  // Runner Settings
  RUNNER: {
    OBSTACLE_SPAWN_RATE: 2000, // ms
    OBSTACLE_SPEED: 300,
    INITIAL_DIFFICULTY: 1,
    DIFFICULTY_SCALE: 1.05 // 5% increase per level
  },

  // Challenge Settings
  CHALLENGES: {
    DIFFICULTY_LEVELS: ['Easy', 'Medium', 'Hard', 'Expert'],
    TIME_LIMIT: 120, // seconds
    MAX_ATTEMPTS: 3
  },

  // Skills & CV
  SKILLS: [
    'Communication',
    'Problem-Solving',
    'Leadership',
    'Creativity',
    'Technical Skills',
    'Teamwork',
    'Critical Thinking',
    'Resilience'
  ],

  // Career Paths
  CAREER_PATHS: [
    'Business & Entrepreneurship',
    'Environmental & Sustainability',
    'Technology & Engineering',
    'Healthcare & Wellness',
    'Arts & Design',
    'Sports & Coaching',
    'Community Leadership',
    'Science & Research'
  ],

  // Mentor System
  MENTORING: {
    MAX_ACTIVE_CONNECTIONS: 5,
    MESSAGE_CHAR_LIMIT: 500,
    RESPONSE_TIME_HOURS: 48,
    BADGE_UNLOCK_MILESTONES: {
      'First Connection': 1,
      'Trusted Ally': 3,
      'Conversationalist': 10,
      'Student of Many': 4,
      'Rising Star': 1,
      'Mentee Champion': 3
    }
  },

  // Character Tiers
  CHARACTER_TIERS: {
    TIER_1: ['Aroha', 'Kahu', 'Malia'],
    TIER_2: ['Rangi', 'Hera', 'Tai'],
    TIER_3: ['Moana', 'Lani', 'Pata']
  },

  // Unlock Requirements
  UNLOCK_REQUIREMENTS: {
    TIER_1: {
      score: 5000,
      challenges_completed: 2
    },
    TIER_2: {
      score: 25000,
      challenges_completed: 8,
      mentors_connected: 1
    },
    TIER_3: {
      score: 50000,
      challenges_completed: 15,
      mentors_connected: 3
    }
  }
};

export default CONFIG;
