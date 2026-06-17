export const DAILY_REWARD = { gold: 100, xp: 50 }

export function isToday(dateString) {
  if (!dateString) return false
  return new Date(dateString).toDateString() === new Date().toDateString()
}

export function canClaimDailyReward(lastDailyRewardDate) {
  return !isToday(lastDailyRewardDate)
}

export function getStreakMessage(streak) {
  if (streak >= 7) return { label: 'On Fire!', emoji: '🔥' }
  if (streak >= 3) return { label: 'Building Momentum', emoji: '⚡' }
  if (streak >= 1) return { label: 'Getting Started', emoji: '🌱' }
  return { label: 'Start Today', emoji: '👋' }
}

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Maya K.', xp: 12400, level: 12, badge: '🌞' },
  { rank: 2, name: 'Liam R.', xp: 10850, level: 11, badge: '🧠' },
  { rank: 3, name: 'Sofia T.', xp: 9720, level: 10, badge: '🏗️' },
  { rank: 4, name: 'Noah P.', xp: 8900, level: 9, badge: '🎮' },
  { rank: 5, name: 'Ava M.', xp: 7650, level: 8, badge: '🌱' },
]

export function getPlayerLeaderboardRank(totalXP, userName) {
  const all = [...MOCK_LEADERBOARD, { rank: 0, name: userName, xp: totalXP, level: Math.floor(totalXP / 1000) + 1, badge: '🏝️', isPlayer: true }]
  all.sort((a, b) => b.xp - a.xp)
  return all.map((entry, i) => ({ ...entry, rank: i + 1 }))
}
