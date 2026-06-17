import { motion } from 'framer-motion'
import { Lock, Trophy } from 'lucide-react'

export default function AchievementCard({ 
  title, 
  description, 
  icon, 
  unlocked = false,
  rarity = 'common' // common, rare, epic, legendary
}) {
  const rarityColors = {
    common: 'from-text-secondary to-blue-400',
    rare: 'from-island-blue to-tropical-green',
    epic: 'from-tropical-green to-golden-sun',
    legendary: 'from-golden-sun to-coral-alert',
  }

  return (
    <motion.div
      whileHover={unlocked ? { y: -4 } : {}}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`premium-card rounded-xl overflow-hidden group ${unlocked ? 'cursor-pointer' : 'opacity-60'}`}
    >
      {/* Glow effect for unlocked */}
      {unlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-island-blue to-tropical-green opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      )}

      <div className="flex flex-col items-center text-center gap-3 relative z-10">
        <div className="relative">
          <div className={`text-5xl ${unlocked ? 'animate-bounce-in' : ''}`}>
            {icon}
          </div>
          {unlocked && (
            <div className="absolute -bottom-2 -right-2">
              <Trophy size={24} className="text-golden-sun animate-pulse" />
            </div>
          )}
        </div>

        <div>
          <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
          <p className="text-xs text-text-secondary">{description}</p>
        </div>

        {unlocked ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-golden-sun to-coral-alert text-ocean-deep"
          >
            Unlocked!
          </motion.div>
        ) : (
          <div className="mt-2 text-text-secondary flex items-center gap-1">
            <Lock size={14} />
            <span className="text-xs">Locked</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}
