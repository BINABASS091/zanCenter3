import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'
import { useGameStore, useUIStore } from '../store/gameStore'
import { canClaimDailyReward, DAILY_REWARD } from '../services/progressionService'

export default function DailyRewardCard() {
  const { lastDailyRewardDate, claimDailyReward } = useGameStore()
  const { addNotification } = useUIStore()
  const canClaim = canClaimDailyReward(lastDailyRewardDate)

  const handleClaim = () => {
    if (!canClaim) return
    claimDailyReward()
    addNotification({
      type: 'success',
      title: 'Daily reward claimed!',
      message: `+${DAILY_REWARD.gold} gold and +${DAILY_REWARD.xp} XP added.`,
    })
  }

  return (
    <motion.div
      whileHover={canClaim ? { scale: 1.02 } : {}}
      className={`premium-card rounded-2xl p-5 md:p-6 ${canClaim ? 'border border-golden-sun/30' : 'opacity-80'}`}
    >
      <div className="flex items-start gap-4">
        <motion.div
          animate={canClaim ? { rotate: [0, -8, 8, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-golden-sun/30 to-coral-alert/20 flex items-center justify-center"
        >
          <Gift size={24} className="text-golden-sun" />
        </motion.div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">Daily Reward</h3>
          <p className="text-sm text-text-secondary mb-3">
            {canClaim
              ? `Claim +${DAILY_REWARD.gold} gold & +${DAILY_REWARD.xp} XP today!`
              : 'Come back tomorrow for your next reward.'}
          </p>
          <button
            onClick={handleClaim}
            disabled={!canClaim}
            className={`text-sm px-4 py-2 rounded-lg font-semibold transition-all ${
              canClaim
                ? 'premium-button-primary'
                : 'bg-white/5 text-text-secondary cursor-not-allowed'
            }`}
          >
            {canClaim ? 'Claim Reward' : 'Claimed ✓'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
