import { motion } from 'framer-motion'

export default function XPBar({ currentXP, maxXP = 1000, level = 1, showLabel = true }) {
  const percentage = (currentXP / maxXP) * 100

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-text-white">Level {level}</span>
          <span className="text-xs text-text-secondary">{currentXP} / {maxXP} XP</span>
        </div>
      )}
      <div className="relative h-3 bg-white bg-opacity-10 rounded-full overflow-hidden border border-island-blue border-opacity-30">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-island-blue to-tropical-green rounded-full"
        />
        {percentage > 0 && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white bg-opacity-20 rounded-full"
          />
        )}
      </div>
    </div>
  )
}
