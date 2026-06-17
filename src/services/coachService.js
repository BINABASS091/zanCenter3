import { getAgeMode } from '../config/ageModes'
import { getCourseProgress } from '../data/reactCourse'

const BASE_TIPS = {
  welcome: {
    explorer: "Hi friend! 🎮 Head to the Game Hub and try Tap Quest — tap treasures as fast as you can!",
    creator: "Welcome Creator! 🎯 Play Quiz Arena or build on your island — earn XP both ways!",
    innovator: "Innovator mode! ⚛️ Open the React Course and work toward your portfolio website.",
  },
  lowGold: 'Need more gold? Play mini-games, explore zones, or claim your daily reward! 💰',
  lowEnergy: 'Power up your island! Place ☀️ Solar Panels in Build mode.',
  buildFirst: 'Your island is empty! Go to Build and place your first building 🏗️',
  playGames: 'Visit the Game Hub — Quiz Arena and Tap Quest are waiting! 🎮',
  reactCourse: 'Learn React to build real websites! Check the React course tab ⚛️',
  explore: 'New zones to discover! Open Explore and find hidden rewards 🗺️',
  streak: (days) => `🔥 ${days}-day streak! Duolingo would be proud — keep playing!`,
  dailyReward: 'Daily reward ready on your dashboard! 🎁',
  missionReady: (title) => `Mission "${title}" is almost done — finish it for bonus XP! 🎯`,
  portfolio: 'Complete React lessons to unlock your portfolio showcase! 📂',
}

export function getCoachContext(state) {
  const {
    gold, energy, buildings, activeMissions, learningStreak,
    ageMode, lastDailyRewardDate, reactCourseProgress, exploredZones,
  } = state
  const tips = []
  const course = getCourseProgress(reactCourseProgress || {})

  if (!buildings?.length) tips.push({ message: BASE_TIPS.buildFirst, emotion: 'excited', priority: 10 })
  if (gold < 50) tips.push({ message: BASE_TIPS.lowGold, emotion: 'thinking', priority: 8 })

  const pending = activeMissions?.find((m) => !m.completed)
  if (pending) tips.push({ message: BASE_TIPS.missionReady(pending.title), emotion: 'excited', priority: 7 })

  if (learningStreak >= 2) tips.push({ message: BASE_TIPS.streak(learningStreak), emotion: 'celebrate', priority: 9 })

  const today = new Date().toDateString()
  if (lastDailyRewardDate !== today) tips.push({ message: BASE_TIPS.dailyReward, emotion: 'excited', priority: 8 })

  if (energy < 110) tips.push({ message: BASE_TIPS.lowEnergy, emotion: 'thinking', priority: 5 })

  if (exploredZones?.length < 2) tips.push({ message: BASE_TIPS.explore, emotion: 'happy', priority: 6 })

  const mode = getAgeMode(ageMode)
  if (mode.codingLevel === 'react' && course.percent < 50) {
    tips.push({ message: BASE_TIPS.reactCourse, emotion: 'thinking', priority: 7 })
  }
  if (mode.codingLevel === 'play') {
    tips.push({ message: BASE_TIPS.playGames, emotion: 'excited', priority: 6 })
  }
  if (course.percent >= 30) tips.push({ message: BASE_TIPS.portfolio, emotion: 'celebrate', priority: 4 })

  tips.push({ message: BASE_TIPS.welcome[ageMode] || BASE_TIPS.welcome.creator, emotion: 'happy', priority: 1 })
  tips.sort((a, b) => b.priority - a.priority)
  return tips[0] || { message: "Let's play and learn today! 🏝️", emotion: 'happy', priority: 0 }
}

export function getCoachQuickReplies(ageMode) {
  const mode = getAgeMode(ageMode)
  if (mode.codingLevel === 'play') return ['Where do I play?', 'How do I build?', 'Fun fact!']
  if (mode.codingLevel === 'intro') return ['Game Hub tip', 'React course tip', 'How to earn XP?']
  return ['React lesson help', 'Portfolio tip', 'Explore zones']
}

export function getEmotionEmoji(emotion) {
  const map = { happy: '😊', excited: '🤩', thinking: '🤔', celebrate: '🎉' }
  return map[emotion] || '🤖'
}

export function getQuickReplyResponse(reply, ageMode) {
  const responses = {
    'Where do I play?': 'Tap Play in the menu to open the Game Hub — try Tap Quest first! 👆',
    'How do I build?': 'Go to Build and drag buildings onto your island map! 🏗️',
    'Fun fact!': 'Every building you place changes your island energy and happiness! ⚡😊',
    'Game Hub tip': 'Quiz Arena gives big XP — answer fast like Kahoot! 🎯',
    'React course tip': 'Start with "What is a Website?" then work up to Components! ⚛️',
    'How to earn XP?': 'Play games, complete missions, explore zones, and finish React lessons! ⭐',
    'React lesson help': 'Read the challenge, edit the code, then hit Run & Complete! 💻',
    'Portfolio tip': 'Finish Module 7 to publish your personal portfolio website! 📂',
    'Explore zones': 'Open Explore and tap undiscovered zones — hidden rewards await! 🗺️',
  }
  return responses[reply] || `Keep exploring Zanzibar.Center Experience Hub! 🌍`
}
