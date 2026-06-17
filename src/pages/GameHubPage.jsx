import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
import QuizArena from '../components/miniGames/QuizArena'
import TapQuest from '../components/miniGames/TapQuest'
import InteractiveLesson from '../components/InteractiveLesson'
import { MINI_GAMES, SEASONAL_EVENT, filterGamesByAge } from '../data/gameHub'
import { useGameStore, useUIStore } from '../store/gameStore'
import { useAgeMode } from '../hooks/useAgeMode'
import { Gamepad2, Users, Zap, Sparkles } from 'lucide-react'

export default function GameHubPage() {
  const navigate = useNavigate()
  const { ageMode } = useAgeMode()
  const { completedMiniGames, completeMiniGame, learningStreak } = useGameStore()
  const { addNotification } = useUIStore()
  const [activeGame, setActiveGame] = useState(null)
  const [jsPlaygroundOpen, setJsPlaygroundOpen] = useState(false)

  const games = filterGamesByAge(MINI_GAMES, ageMode)

  const handleGame = (game) => {
    if (game.id === 'js-playground') {
      setJsPlaygroundOpen(true)
      return
    }
    if (game.type === 'inline') {
      setActiveGame(game.id)
      return
    }
    if (game.route) navigate(game.route)
  }

  const onGameComplete = (gameId, xp) => {
    if (!completedMiniGames.includes(gameId)) {
      completeMiniGame(gameId, xp)
      addNotification({ type: 'success', title: 'Game complete!', message: `+${xp} XP earned!` })
    }
    setActiveGame(null)
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />

      {activeGame === 'quiz-arena' && (
        <QuizArena
          onClose={() => setActiveGame(null)}
          onComplete={() => onGameComplete('quiz-arena', 150)}
        />
      )}
      {activeGame === 'tap-quest' && (
        <TapQuest
          onClose={() => setActiveGame(null)}
          onComplete={() => onGameComplete('tap-quest', 80)}
        />
      )}
      <InteractiveLesson
        isOpen={jsPlaygroundOpen}
        onClose={() => setJsPlaygroundOpen(false)}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Gamepad2 className="text-island-blue" size={32} />
            <h1 className="text-3xl md:text-5xl font-bold">Game Hub</h1>
          </div>
          <p className="text-text-secondary text-lg">Play, build, explore — a world of fun for kids everywhere 🌍</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl p-6 md:p-8 mb-8 bg-gradient-to-r ${SEASONAL_EVENT.theme} border border-white/10 relative overflow-hidden`}
        >
          <div className="absolute right-4 top-4 text-6xl opacity-30">{SEASONAL_EVENT.emoji}</div>
          <div className="relative z-10">
            <span className="text-xs font-bold tracking-widest text-golden-sun uppercase flex items-center gap-1">
              <Sparkles size={14} /> Live Event · {SEASONAL_EVENT.endsIn} left
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-2">{SEASONAL_EVENT.title}</h2>
            <p className="text-text-secondary mb-4">{SEASONAL_EVENT.subtitle}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className="glass-effect px-3 py-1 rounded-full">🔥 {learningStreak} day streak</span>
              <span className="glass-effect px-3 py-1 rounded-full">⚡ {SEASONAL_EVENT.bonusXP}x XP bonus</span>
            </div>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {games.map((game, i) => {
            const played = completedMiniGames.includes(game.id)
            return (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGame(game)}
                className={`text-left landing-feature-card p-5 md:p-6 bg-gradient-to-br ${game.color}`}
              >
                <div className="text-4xl mb-3">{game.emoji}</div>
                <h3 className="font-bold text-lg mb-1">{game.title}</h3>
                <p className="text-sm text-text-secondary mb-3 line-clamp-2">{game.description}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="glass-effect px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap size={10} /> +{game.xp} XP
                  </span>
                  <span className="glass-effect px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Users size={10} /> {game.players}
                  </span>
                  {played && <span className="text-tropical-green">✓ Played</span>}
                </div>
                <p className="text-[10px] text-text-secondary/60 mt-2">Inspired by {game.inspiration}</p>
              </motion.button>
            )
          })}
        </div>
      </main>
    </div>
  )
}
