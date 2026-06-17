import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import TopNavigation from '../components/TopNavigation'
import BuildingCard from '../components/BuildingCard'
import { useGameStore } from '../store/gameStore'
import { Grid3x3 } from 'lucide-react'
import IslandMap from '../components/IslandMap'
import { useUIStore } from '../store/gameStore'
import { buildingCatalog } from '../data/sampleData'

const MAX_ISLAND_CAPACITY = 24

export default function IslandMapPage() {
  const {
    buildings: placedBuildings,
    gold,
    placeBuilding,
    removeBuilding,
    moveBuilding,
    upgradeBuilding,
    completedMissions,
    unlockedAchievements,
  } = useGameStore()
  const { addNotification } = useUIStore()
  const [selectedBuilding, setSelectedBuilding] = useState(null)

  const handlePlaceBuilding = (building, position = null) => {
    placeBuilding(building, position || {
      x: Math.random() * 0.7 + 0.1,
      y: Math.random() * 0.55 + 0.1,
    })
    setSelectedBuilding(null)
  }

  const handleClearBuilding = (buildingId) => {
    removeBuilding(buildingId)
  }

  const handleUpgradeBuilding = (buildingId) => {
    const building = placedBuildings.find((b) => b.id === buildingId)
    if (!building) return
    const catalog = buildingCatalog.find((b) => b.type === building.type)
    const maxLevel = catalog?.maxLevel || 3
    const currentLevel = building.level || 1
    const cost = catalog?.upgradeCost || 100

    if (currentLevel >= maxLevel) {
      addNotification({ type: 'info', title: 'Max level reached', message: `${building.name} is already at Level ${maxLevel}!` })
      return
    }

    if (gold < cost) {
      addNotification({ type: 'error', title: 'Not enough gold', message: `Upgrading to Level ${currentLevel + 1} requires ${cost} gold.` })
      return
    }

    upgradeBuilding(buildingId)
    addNotification({ type: 'success', title: 'Building upgraded!', message: `${building.name} upgraded to Level ${currentLevel + 1} for ${cost} gold! 🚀` })
  }

  const handleDropBuilding = (payload, position) => {
    if (payload.type === 'catalog') {
      const building = buildingCatalog.find((item) => item.type === payload.buildingType)
      if (building && gold >= building.cost) {
        handlePlaceBuilding(building, position)
        addNotification({ type: 'success', title: 'Building placed', message: `${building.name} added to your island.` })
      } else {
        addNotification({ type: 'error', title: 'Not enough gold', message: 'Complete missions to earn more gold.' })
      }
      return
    }

    if (payload.type === 'placed') {
      moveBuilding(payload.buildingId, position)
    }
  }

  const placementHint = useMemo(() => {
    if (gold < 50) return 'Earn more gold to place new buildings.'
    if (placedBuildings.length === 0) return 'Choose a building and place it on the island.'
    return 'Drag buildings to rearrange your island.'
  }, [gold, placedBuildings.length])

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Build Your Island</h1>
          <p className="text-text-secondary text-lg">
            Minecraft meets Animal Crossing — drag buildings and manage your world
          </p>
        </motion.div>

        {/* Resource Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { label: 'Gold', value: gold, emoji: '💰' },
            { label: 'Buildings', value: placedBuildings.length, emoji: '🏗️' },
            { label: 'Area Used', value: `${Math.floor((placedBuildings.length / MAX_ISLAND_CAPACITY) * 100)}%`, emoji: '📍' },
            { label: 'Capacity', value: MAX_ISLAND_CAPACITY, emoji: '🏝️' },
          ].map((item) => (
            <div key={item.label} className="premium-card rounded-lg p-4">
              <p className="text-2xl mb-2">{item.emoji}</p>
              <p className="text-text-secondary text-xs mb-1">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Island Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 premium-card rounded-2xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Grid3x3 size={24} />
                Island Canvas
              </h2>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="glass-effect rounded-lg px-3 py-1.5">
                  {placedBuildings.length}/{MAX_ISLAND_CAPACITY} buildings
                </span>
                <span className={`rounded-lg px-3 py-1.5 font-semibold ${
                  gold >= 500 ? 'bg-tropical-green/20 text-tropical-green' :
                  gold >= 200 ? 'bg-golden-sun/20 text-golden-sun' :
                  'bg-coral-alert/20 text-coral-alert'
                }`}>
                  💰 {gold} gold
                </span>
              </div>
            </div>

            {/* Grid */}
            <IslandMap
              buildings={placedBuildings}
              onRemoveBuilding={handleClearBuilding}
              onDropBuilding={handleDropBuilding}
              onMoveBuilding={moveBuilding}
              onUpgradeBuilding={handleUpgradeBuilding}
            />

            {/* Info */}
            <p className="text-xs text-text-secondary mt-4">
              💡 {placementHint}
            </p>
          </motion.div>

          {/* Building Palette */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <h3 className="text-xl font-bold mb-6">Available Buildings</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {buildingCatalog.map((building) => (
                <motion.div
                  key={building.id}
                  whileHover={{ y: -2 }}
                  draggable
                  onDragStart={(event) => {
                    event.dataTransfer.setData('application/json', JSON.stringify({
                      type: 'catalog',
                      buildingType: building.type,
                    }))
                  }}
                  className={`cursor-pointer transition-all ${
                    selectedBuilding?.id === building.id ? 'ring-2 ring-island-blue' : ''
                  }`}
                  onClick={() => setSelectedBuilding(building)}
                >
                  <BuildingCard
                    name={building.name}
                    icon={building.icon}
                    description={building.description}
                    cost={building.cost}
                    effect={building.effect}
                    available={gold >= building.cost}
                    selected={selectedBuilding?.id === building.id}
                    onPlace={() => handlePlaceBuilding(building)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tutorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 premium-card rounded-xl p-6 glass-effect"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            💡 Building Tips
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold text-island-blue mb-2">🏗️ Placement Strategy</p>
              <p className="text-sm text-text-secondary">Group similar buildings together for synergy bonuses and improved efficiency.</p>
            </div>
            <div>
              <p className="font-semibold text-tropical-green mb-2">📊 Resource Management</p>
              <p className="text-sm text-text-secondary">Balance your resource buildings with service buildings to maintain island happiness.</p>
            </div>
            <div>
              <p className="font-semibold text-golden-sun mb-2">🎯 Progression</p>
              <p className="text-sm text-text-secondary">Unlock new building types by completing missions and reaching higher levels.</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
