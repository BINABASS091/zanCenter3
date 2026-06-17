import XPBar from './XPBar'
import { useGameStore } from '../store/gameStore'
import { useAgeMode } from '../hooks/useAgeMode'
import { getStreakMessage } from '../services/progressionService'
import { Flame, Star } from 'lucide-react'

export default function XPTracker({ className = '' }) {
  const { xp, level, totalXP, learningStreak } = useGameStore()
  const { mode } = useAgeMode()
  const streak = getStreakMessage(learningStreak)

  return (
    <div className={`premium-card rounded-2xl p-5 md:p-6 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{mode.emoji}</span>
          <div>
            <p className="text-xs text-text-secondary">{mode.label}</p>
            <p className="font-bold flex items-center gap-1">
              <Star size={14} className="text-golden-sun" /> Level {level}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 glass-effect px-3 py-1.5 rounded-full text-sm">
          <Flame size={16} className="text-coral-alert" />
          <span>{learningStreak}d</span>
          <span className="text-text-secondary text-xs">{streak.emoji}</span>
        </div>
      </div>
      <XPBar currentXP={xp} level={level} />
      <p className="text-xs text-text-secondary mt-3">
        {totalXP.toLocaleString()} total XP · {1000 - xp} XP to next level
      </p>
    </div>
  )
}
