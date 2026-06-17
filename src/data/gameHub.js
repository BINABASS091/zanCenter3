const EVENT_END_DATE = new Date('2026-06-30T23:59:59Z')

function computeEndsIn() {
  const now = new Date()
  const diffMs = EVENT_END_DATE - now
  if (diffMs <= 0) return 'event ended'
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (days === 0) return 'today'
  if (days === 1) return '1 day'
  return `${days} days`
}

export const SEASONAL_EVENT = {
  id: 'spring-festival-2026',
  title: 'Spring Island Festival',
  subtitle: 'Limited-time rewards, exclusive badges & bonus XP!',
  emoji: '🌸',
  endsIn: computeEndsIn(),
  bonusXP: 2,
  theme: 'from-tropical-green/30 to-island-blue/20',
}

export const MINI_GAMES = [
  {
    id: 'island-builder',
    title: 'Island Builder',
    description: 'Drag & drop buildings — Minecraft meets Animal Crossing!',
    emoji: '🏗️',
    inspiration: 'Minecraft',
    minAgeMode: 'explorer',
    route: '/island',
    xp: 100,
    players: '12.4K',
    color: 'from-island-blue/20 to-tropical-green/10',
  },
  {
    id: 'quiz-arena',
    title: 'Quiz Arena',
    description: 'Fast-paced trivia battles — Kahoot style!',
    emoji: '🎯',
    inspiration: 'Kahoot!',
    minAgeMode: 'creator',
    type: 'inline',
    xp: 150,
    players: '8.2K',
    color: 'from-golden-sun/20 to-coral-alert/10',
  },
  {
    id: 'tap-quest',
    title: 'Tap Quest',
    description: 'Tap to collect treasures — perfect for little explorers!',
    emoji: '👆',
    inspiration: 'Toca Life',
    minAgeMode: 'explorer',
    type: 'inline',
    xp: 80,
    players: '15.1K',
    color: 'from-golden-sun/20 to-island-blue/10',
  },
  {
    id: 'energy-race',
    title: 'Energy Race',
    description: 'Power your island before time runs out!',
    emoji: '⚡',
    inspiration: 'Stardew Valley',
    minAgeMode: 'creator',
    route: '/island',
    xp: 120,
    players: '6.8K',
    color: 'from-tropical-green/20 to-golden-sun/10',
  },
  {
    id: 'zone-explorer',
    title: 'Zone Explorer',
    description: 'Discover hidden island regions — Pokémon GO style!',
    emoji: '🗺️',
    inspiration: 'Pokémon GO',
    minAgeMode: 'explorer',
    route: '/explore',
    xp: 200,
    players: '9.5K',
    color: 'from-island-blue/20 to-coral-alert/10',
  },
  {
    id: 'happy-citizens',
    title: 'Happy Citizens',
    description: 'Keep your island smiling — Duolingo streak energy!',
    emoji: '😊',
    inspiration: 'Duolingo',
    minAgeMode: 'creator',
    route: '/dashboard',
    xp: 90,
    players: '7.3K',
    color: 'from-coral-alert/20 to-tropical-green/10',
  },
  {
    id: 'react-challenge',
    title: 'React Code Challenge',
    description: 'Build UI components — Roblox Studio for the web!',
    emoji: '⚛️',
    inspiration: 'Roblox Studio',
    minAgeMode: 'innovator',
    route: '/react-course',
    xp: 250,
    players: '4.1K',
    color: 'from-island-blue/20 to-golden-sun/10',
  },
  {
    id: 'creative-studio',
    title: 'Creative Studio',
    description: 'Design your portfolio showcase — LEGO Worlds creativity!',
    emoji: '🎨',
    inspiration: 'LEGO Worlds',
    minAgeMode: 'innovator',
    route: '/portfolio',
    xp: 300,
    players: '3.6K',
    color: 'from-tropical-green/20 to-island-blue/10',
  },
  {
    id: 'js-playground',
    title: 'JS Playground',
    description: 'Write your first JavaScript loop and plant farms on your island!',
    emoji: '💻',
    inspiration: 'CodeCombat',
    minAgeMode: 'creator',
    type: 'inline',
    xp: 250,
    players: '5.9K',
    color: 'from-island-blue/20 to-tropical-green/10',
  },
]

export const ISLAND_ZONES = [
  { id: 'beach', name: 'Sunny Beach', emoji: '🏖️', unlocked: true, reward: 50, description: 'Start your adventure here!' },
  { id: 'forest', name: 'Mystic Forest', emoji: '🌲', unlocked: false, requiresLevel: 2, reward: 100, description: 'Hidden creatures and eco missions' },
  { id: 'city', name: 'Skyline City', emoji: '🏙️', unlocked: false, requiresLevel: 3, reward: 150, description: 'Build towers and smart systems' },
  { id: 'tech-bay', name: 'Tech Bay', emoji: '💻', unlocked: false, requiresLevel: 4, reward: 200, description: 'React coding challenges await' },
  { id: 'crystal-cave', name: 'Crystal Cave', emoji: '💎', unlocked: false, requiresLevel: 5, reward: 300, description: 'Legendary treasures for explorers' },
]

const MODE_ORDER = { explorer: 0, creator: 1, innovator: 2 }

export function filterGamesByAge(games, ageMode = 'creator') {
  const level = MODE_ORDER[ageMode] ?? 1
  return games.filter((g) => (MODE_ORDER[g.minAgeMode] ?? 1) <= level)
}
