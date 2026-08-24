# Mentor Networking System - Technical Design

## Overview

The mentor system connects players with verified Māori and Pacific women leaders across various industries. It integrates seamlessly with gameplay while providing real mentoring value.

## System Architecture

### 1. Mentor Directory

**Data Structure:**
```javascript
{
  mentorId: 'mentor-uuid',
  profile: {
    name: 'Kahu Moana',
    profession: 'Marine Biologist',
    organization: 'Conservation Trust Aotearoa',
    bio: 'I help young women find their voice in environmental science',
    image: 'url-to-photo',
    ethnicity: ['Māori', 'Ngāpuhi'],
    location: 'Auckland, NZ'
  },
  expertise: ['Environmental Science', 'Advocacy', 'Leadership', 'Marine Biology'],
  availability: {
    videoCallsMonthly: true,
    asyncMessaging: true,
    emergencyChats: false,
    maxMentees: 10
  },
  stats: {
    menteeCount: 47,
    averageRating: 4.8,
    responseTimeHours: 24,
    yearsExperience: 12
  },
  adviceClips: [
    { title: 'How I Started in STEM', url: 'video-url', duration: 134 },
    { title: 'Overcoming Imposter Syndrome', url: 'video-url', duration: 195 }
  ]
}
```

### 2. Connection Request Flow

1. **Player initiates**
   - Browse mentor directory
   - Select mentor
   - Submit personalized connection request
   - Request queued in Firebase

2. **Mentor receives notification**
   - Email + in-app alert
   - View player profile
   - Accept/Decline/Message request

3. **Connection established**
   - Messaging channel opens
   - Calendar for scheduling (if video calls enabled)
   - Mentor badge added to player profile

### 3. Messaging System

**Features:**
- Real-time chat within game
- Message history saved
- File/resource sharing
- Message templates (for mentors)
- Notification preferences

**Backend:** Firebase Realtime Database or Supabase

### 4. Mentor Matching Algorithm

```javascript
function matchMentors(playerProfile) {
  const scores = mentors.map(mentor => {
    let score = 0;
    
    // Career interest alignment (40%)
    score += calculateCareerMatch(playerProfile.careerPath, mentor.expertise) * 0.4;
    
    // Personality compatibility (25%)
    score += calculatePersonalityMatch(playerProfile.personality, mentor.style) * 0.25;
    
    // Availability (20%)
    score += (mentor.availability.maxMentees > mentor.currentMentees) ? 20 : 0;
    
    // Representation (15%)
    score += calculateEthnicityMatch(playerProfile.heritage, mentor.ethnicity) * 0.15;
    
    return { mentor, score };
  });
  
  return scores.sort((a, b) => b.score - a.score).slice(0, 5);
}
```

### 5. Badge System

**Unlock Badges:**
- 🌱 **First Connection** - Connect with 1st mentor
- 🤝 **Trusted Ally** - Maintain 3+ active connections
- 💬 **Conversationalist** - Complete 10 mentor chats
- 🎓 **Student of Many** - Get advice from 4+ fields
- 🌟 **Rising Star** - Mentor validates excellence
- 👑 **Mentee Champion** - Share mentor advice (3+ upvotes)

**Mentor Badges:**
- 💪 **Mentor Champion** - 10+ mentees helped
- ⭐ **Highly Rated** - 4.5+ average rating
- 🔥 **Super Responder** - <24hr avg response time
- 🎯 **Goal Matcher** - Mentee reached career goal

## Implementation Roadmap

### Phase 1: Backend Setup
- [ ] Firebase/Supabase setup
- [ ] Mentor database schema
- [ ] Authentication system
- [ ] Messaging infrastructure

### Phase 2: UI Components
- [ ] Mentor directory interface
- [ ] Mentor profile cards
- [ ] Connection request modal
- [ ] Chat interface
- [ ] Badge display system

### Phase 3: Integration
- [ ] Connect to game events
- [ ] Mentor unlock system
- [ ] Challenge integration
- [ ] Notification system

### Phase 4: Testing & Refinement
- [ ] QA with mentors
- [ ] Beta test with players
- [ ] Community feedback loops
- [ ] Performance optimization

## Safety & Moderation

**Player Protection:**
- All mentors verified and background checked
- Message moderation (automated + manual)
- Reporting system for inappropriate behavior
- Mentor removal policy
- Parental opt-in for under-13s

**Mentor Support:**
- Code of conduct training
- Response time expectations
- Boundaries documentation
- Community of practice calls
