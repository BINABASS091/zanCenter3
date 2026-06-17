import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { getPlayerLeaderboardRank } from '../services/progressionService'

export default function LeaderboardPanel() {
  const { totalXP, userName } = useGameStore()
  const rankings = getPlayerLeaderboardRank(totalXP, userName).slice(0, 6)

  return (
    <div className="premium-card rounded-2xl p-5 md:p-6">
      <div className="flex items-center gap-2 mb-5">
        <Trophy size={22} className="text-golden-sun" />
        <h3 className="font-bold text-lg">Global Leaderboard</h3>
      </div>
      <div className="space-y-2">
        {rankings.map((entry, i) => (
          <motion.div
            key={`${entry.name}-${i}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              entry.isPlayer
                ? 'bg-island-blue/15 border border-island-blue/30'
                : 'glass-effect hover:bg-white/5'
            }`}
          >
            <span className={`w-7 text-center font-bold text-sm ${
              entry.rank === 1 ? 'text-golden-sun' : entry.rank === 2 ? 'text-text-secondary' : 'text-text-secondary/70'
            }`}>
              #{entry.rank}
            </span>
            <span className="text-lg">{entry.badge}</span>
            <span className={`flex-1 text-sm truncate ${entry.isPlayer ? 'font-bold text-island-blue' : ''}`}>
              {entry.name}
            </span>
            <span className="text-xs text-text-secondary">Lv.{entry.level}</span>
            <span className="text-sm font-semibold text-tropical-green w-16 text-right">
              {entry.xp >= 1000 ? `${(entry.xp / 1000).toFixed(1)}k` : entry.xp}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
