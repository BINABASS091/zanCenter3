import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AGE_MODE_LIST } from '../config/ageModes'
import { useGameStore } from '../store/gameStore'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function AgeModeSelector() {
  const { onboardingComplete, completeOnboarding } = useGameStore()
  const [selected, setSelected] = useState('creator')
  const [userName, setUserName] = useState('Explorer')

  if (onboardingComplete) return null

  const handleStart = () => {
    completeOnboarding({ userName: userName.trim() || 'Explorer', ageMode: selected })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ocean-deep/90 backdrop-blur-lg"
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-3xl landing-gradient-border"
        >
          <div className="landing-gradient-border-inner p-6 md:p-10 max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-8">
              <motion.div
                className="flex justify-center mb-5"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <img src="/zanzibar.Camp_logo-Photoroom.png" alt="Zanzibar.Camp" className="h-32 w-auto object-contain" />
              </motion.div>
              <h2 className="text-2xl md:text-4xl font-bold mb-2">Welcome to Zanzibar.Center</h2>
              <p className="text-text-secondary">Choose how you play — games for kids, React for web builders</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-text-secondary mb-2">Your explorer name</label>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Explorer"
                className="w-full glass-effect rounded-xl px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-island-blue/50"
              />
            </div>

            <div className="grid gap-4 mb-8">
              {AGE_MODE_LIST.map((mode) => (
                <motion.button
                  key={mode.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setSelected(mode.id)}
                  className={`text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-300 ${
                    selected === mode.id
                      ? 'border-island-blue bg-island-blue/10 shadow-premium'
                      : 'border-white/10 glass-effect hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{mode.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{mode.label}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-text-secondary">
                          Ages {mode.ages}
                        </span>
                      </div>
                      <p className="text-sm text-island-blue mb-2">{mode.tagline}</p>
                      <p className="text-xs text-text-secondary line-clamp-2">
                        {mode.features.slice(0, 3).join(' · ')}
                      </p>
                    </div>
                    {selected === mode.id && (
                      <Sparkles size={20} className="text-tropical-green flex-shrink-0" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={handleStart}
              className="w-full premium-button-primary text-lg py-4 flex items-center justify-center gap-2 group"
            >
              Begin Your Island Adventure
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
