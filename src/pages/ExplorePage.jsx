import { motion } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import { ISLAND_ZONES } from '../data/gameHub'
import { useGameStore, useUIStore } from '../store/gameStore'
import { Map, Lock, CheckCircle, Compass } from 'lucide-react'

export default function ExplorePage() {
  const { level, unlockedZones, exploredZones, exploreZone, unlockZone } = useGameStore()
  const { addNotification } = useUIStore()

  const zones = ISLAND_ZONES.map((zone) => ({
    ...zone,
    isUnlocked: unlockedZones.includes(zone.id) || zone.unlocked || level >= (zone.requiresLevel || 1),
    isExplored: exploredZones.includes(zone.id),
  }))

  const handleExplore = (zone) => {
    if (!zone.isUnlocked) {
      addNotification({ type: 'info', title: 'Zone locked', message: `Reach Level ${zone.requiresLevel} to unlock ${zone.name}` })
      return
    }
    if (zone.isExplored) {
      addNotification({ type: 'info', title: 'Already explored', message: `You've discovered ${zone.name}!` })
      return
    }
    unlockZone(zone.id)
    exploreZone(zone.id, zone.reward)
    addNotification({ type: 'success', title: 'Zone discovered!', message: `${zone.name} — +${zone.reward} gold & XP!` })
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Compass className="text-tropical-green" size={32} />
            <h1 className="text-3xl md:text-5xl font-bold">Explore the Island</h1>
          </div>
          <p className="text-text-secondary text-lg">
            Discover hidden zones — Pokémon GO meets Animal Crossing 🗺️
          </p>
        </motion.div>

        <div className="relative mb-8 rounded-3xl overflow-hidden aspect-[2/1] md:aspect-[3/1] border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-island-blue/20 via-ocean-deep to-tropical-green/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-8xl md:text-9xl opacity-40"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              🏝️
            </motion.span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs text-text-secondary">
            <span>{exploredZones.length} / {zones.length} zones discovered</span>
            <span>Level {level}</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {zones.map((zone, i) => (
            <motion.button
              key={zone.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={zone.isUnlocked ? { y: -4 } : {}}
              onClick={() => handleExplore(zone)}
              className={`text-left premium-card rounded-2xl p-5 md:p-6 transition-all ${
                !zone.isUnlocked ? 'opacity-60' : zone.isExplored ? 'border-tropical-green/30' : 'hover:border-island-blue/40'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-4xl">{zone.emoji}</span>
                {zone.isExplored ? (
                  <CheckCircle size={22} className="text-tropical-green" />
                ) : !zone.isUnlocked ? (
                  <Lock size={20} className="text-text-secondary" />
                ) : (
                  <Map size={20} className="text-island-blue" />
                )}
              </div>
              <h3 className="font-bold text-lg mb-1">{zone.name}</h3>
              <p className="text-sm text-text-secondary mb-3">{zone.description}</p>
              <div className="flex justify-between text-xs">
                <span className="text-golden-sun">+{zone.reward} reward</span>
                {!zone.isUnlocked && zone.requiresLevel && (
                  <span>Lv.{zone.requiresLevel} required</span>
                )}
                {zone.isExplored && <span className="text-tropical-green">Explored ✓</span>}
              </div>
            </motion.button>
          ))}
        </div>
      </main>
    </div>
  )
}
