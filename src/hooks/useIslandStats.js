import { useGameStore } from '../store/gameStore'

const STAT_CONFIG = [
  { key: 'energy', label: 'Energy', emoji: '⚡' },
  { key: 'food', label: 'Food', emoji: '🌽' },
  { key: 'happiness', label: 'Happiness', emoji: '😊' },
  { key: 'population', label: 'Population', emoji: '👥' },
  { key: 'environment', label: 'Environment', emoji: '🌱' },
  { key: 'innovation', label: 'Innovation', emoji: '🧠' },
]

export function useIslandStats() {
  const stats = useGameStore((s) => ({
    energy: s.energy,
    food: s.food,
    happiness: s.happiness,
    population: s.population,
    environment: s.environment,
    innovation: s.innovation,
  }))

  const items = STAT_CONFIG.map((cfg) => ({
    ...cfg,
    value: stats[cfg.key],
    health: stats[cfg.key] >= 120 ? 'strong' : stats[cfg.key] >= 90 ? 'stable' : 'low',
  }))

  const overallHealth = Math.round(
    items.reduce((sum, item) => sum + Math.min(item.value, 200), 0) / items.length
  )

  return { stats, items, overallHealth }
}
