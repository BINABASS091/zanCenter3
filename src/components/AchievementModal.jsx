import { motion, AnimatePresence } from 'framer-motion'
import { X, Share2 } from 'lucide-react'
import { useUIStore } from '../store/gameStore'
import { useGameStore } from '../store/gameStore'

const RARITY_COLORS = {
  common: 'from-text-secondary/30 to-white/10',
  rare: 'from-island-blue/30 to-tropical-green/10',
  epic: 'from-tropical-green/30 to-island-blue/10',
  legendary: 'from-golden-sun/30 to-coral-alert/10',
}

export default function AchievementModal() {
  const { showAchievementModal, selectedAchievement, closeAchievementModal, addNotification } = useUIStore()
  const { userName } = useGameStore()

  if (!selectedAchievement) return null

  const rarity = selectedAchievement.rarity || 'rare'
  const gradient = RARITY_COLORS[rarity] || RARITY_COLORS.rare

  const handleShare = async () => {
    const text = `🏆 ${userName} just unlocked the "${selectedAchievement.title}" achievement on Zanzibar.Center!\n${selectedAchievement.description}\nzanzibar.center`
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Achievement Unlocked!', text, url: 'https://zanzibar.center' })
      } catch {
        // cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      addNotification({ type: 'success', title: 'Copied!', message: 'Achievement share text copied to clipboard.' })
    }
  }

  return (
    <AnimatePresence>
      {showAchievementModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-ocean-deep/80 backdrop-blur-md"
          onClick={closeAchievementModal}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`rounded-3xl p-[2px] bg-gradient-to-br ${gradient}`}>
              <div className="rounded-3xl bg-ocean-deep/95 p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-island-blue/10 to-transparent pointer-events-none" />
                <button
                  onClick={closeAchievementModal}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors z-10"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                  transition={{ duration: 0.6 }}
                  className="text-7xl mb-4"
                >
                  {selectedAchievement.icon || '🏆'}
                </motion.div>

                <p className="text-golden-sun text-sm font-bold tracking-widest uppercase mb-2">
                  Achievement Unlocked!
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedAchievement.title}</h2>
                <p className="text-text-secondary mb-4">{selectedAchievement.description}</p>
                <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 text-island-blue capitalize mb-6">
                  {rarity}
                </span>

                <div className="flex gap-3 justify-center">
                  <button onClick={closeAchievementModal} className="premium-button-primary px-6">
                    Awesome!
                  </button>
                  <button onClick={handleShare} className="premium-button-secondary px-4 flex items-center gap-2">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
