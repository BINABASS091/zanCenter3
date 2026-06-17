import { motion } from 'framer-motion'
import StatusCard from './StatusCard'
import { useIslandStats } from '../hooks/useIslandStats'
import { Zap, Droplets, Heart, Users, Leaf, Lightbulb } from 'lucide-react'

const ICON_MAP = {
  energy: Zap,
  food: Droplets,
  happiness: Heart,
  population: Users,
  environment: Leaf,
  innovation: Lightbulb,
}

const COLOR_MAP = {
  energy: 'tropical-green',
  food: 'island-blue',
  happiness: 'coral-alert',
  population: 'island-blue',
  environment: 'tropical-green',
  innovation: 'golden-sun',
}

export default function StatusPanel({ className = '' }) {
  const { items, overallHealth } = useIslandStats()

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Island Systems</h2>
        <span className="text-sm glass-effect px-3 py-1 rounded-full text-island-blue">
          Health {overallHealth}%
        </span>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        {items.map((item) => {
          const Icon = ICON_MAP[item.key]
          const trend = item.health === 'strong' ? 8 : item.health === 'stable' ? 2 : -5
          return (
            <motion.div
              key={item.key}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatusCard
                label={item.label}
                value={item.value}
                icon={<Icon />}
                color={COLOR_MAP[item.key]}
                trend={trend}
              />
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
