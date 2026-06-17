export const AGE_MODES = {
  explorer: {
    id: 'explorer',
    label: 'Explorer Mode',
    ages: '5–8',
    emoji: '🟡',
    color: '#FFCC00',
    tagline: 'Tap, play, and explore magical island worlds',
    inspiration: ['Minecraft Creative', 'Toca Life World', 'LEGO Worlds'],
    features: ['Tap Quest mini-game', 'Island building', 'Story zones', 'Large friendly UI', 'No reading required'],
    codingLevel: 'play',
    uiScale: 'large',
    missionDifficultyCap: 'easy',
  },
  creator: {
    id: 'creator',
    label: 'Creator Mode',
    ages: '9–12',
    emoji: '🟠',
    color: '#00D4FF',
    tagline: 'Play missions, manage resources, and start building websites',
    inspiration: ['Roblox', 'Kahoot!', 'Stardew Valley'],
    features: ['Quiz Arena battles', 'Resource missions', 'HTML & React intro', 'World building', 'Leaderboards'],
    codingLevel: 'intro',
    uiScale: 'medium',
    missionDifficultyCap: 'medium',
  },
  innovator: {
    id: 'innovator',
    label: 'Innovator Mode',
    ages: '13–16',
    emoji: '🔵',
    color: '#2EE59D',
    tagline: 'Master React, build real websites & portfolios',
    inspiration: ['Fortnite events', 'Roblox Studio', 'Duolingo'],
    features: ['Full React course', 'Portfolio project', 'System design', 'Code challenges', 'Global competition'],
    codingLevel: 'react',
    uiScale: 'compact',
    missionDifficultyCap: 'hard',
  },
}

export const AGE_MODE_LIST = Object.values(AGE_MODES)

export function getAgeMode(modeId) {
  return AGE_MODES[modeId] || AGE_MODES.creator
}
