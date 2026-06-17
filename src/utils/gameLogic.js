const STAT_KEYS = ['energy', 'food', 'happiness', 'population', 'environment', 'innovation']

export const DEFAULT_STATS = {
  energy: 100,
  food: 100,
  happiness: 100,
  population: 10,
  environment: 100,
  innovation: 50,
}

export const buildingEffects = {
  house: { population: 10, happiness: 2 },
  school: { innovation: 15, happiness: 4 },
  solarPanel: { energy: 20, environment: 6 },
  farm: { food: 25, happiness: 3 },
  hospital: { happiness: 20, environment: 2 },
  park: { happiness: 15, environment: 10 },
  researchLab: { innovation: 30 },
  windTurbine: { energy: 15, environment: 10 },
}

const clamp = (value, min = 0, max = 200) => Math.max(min, Math.min(max, value))

export function calculateIslandStats(buildings = []) {
  const stats = { ...DEFAULT_STATS }

  buildings.forEach((building) => {
    const effect = buildingEffects[building.type]
    if (!effect) return
    const level = building.level || 1

    Object.entries(effect).forEach(([key, value]) => {
      if (STAT_KEYS.includes(key)) {
        stats[key] = clamp(stats[key] + value * level)
      }
    })
  })

  return stats
}

export function evaluateMissionCompletion(missions = [], buildings = [], stats = {}) {
  return missions.map((mission) => {
    if (mission.completed) return mission

    const buildingCount = (type) => buildings.filter((building) => building.type === type).length

    let completed = false

    switch (mission.id) {
      case 1:
        completed = buildingCount('solarPanel') >= 1 && (stats.energy || 0) >= 120
        break
      case 2:
        completed = buildingCount('farm') >= 1 && (stats.food || 0) >= 120
        break
      case 3:
        completed = buildingCount('researchLab') >= 1 && (stats.innovation || 0) >= 80
        break
      case 4:
        completed = (stats.environment || 0) >= 130
        break
      case 5:
        completed = (stats.happiness || 0) >= 130
        break
      case 6: {
        const balanced = ['energy', 'food', 'happiness', 'environment', 'innovation']
          .every((key) => (stats[key] || 0) >= 110)
        completed = buildings.length >= 5 && balanced
        break
      }
      default:
        completed = false
    }

    return completed ? { ...mission, completed: true } : mission
  })
}

export function evaluateAchievements({ buildings = [], stats = {}, level = 1, completedMissions = [] }) {
  const buildingCount = buildings.length
  const buildingTypeCount = (type) => buildings.filter((building) => building.type === type).length

  return [
    {
      id: 'solar-hero',
      title: 'Solar Engineer',
      unlocked: buildingTypeCount('solarPanel') >= 1 || (stats.energy || 0) >= 130,
    },
    {
      id: 'smart-farmer',
      title: 'Eco Builder',
      unlocked: buildingTypeCount('farm') >= 1 || (stats.food || 0) >= 130,
    },
    {
      id: 'eco-champion',
      title: 'Eco Champion',
      unlocked: (stats.environment || 0) >= 130,
    },
    {
      id: 'future-engineer',
      title: 'Logic Master',
      unlocked: buildingTypeCount('researchLab') >= 1 || (stats.innovation || 0) >= 120 || level >= 3,
    },
    {
      id: 'island-architect',
      title: 'Island Architect',
      unlocked: buildingCount >= 5 || completedMissions.length >= 3,
    },
    {
      id: 'knowledge-seeker',
      title: 'Game Creator',
      unlocked: level >= 2 || (stats.innovation || 0) >= 70,
    },
  ]
}

export function snapPosition(pos) {
  // Snap x to nearest 0.1
  const x = Math.max(0.05, Math.min(0.85, Math.round(pos.x * 10) / 10))
  // Snap y to nearest 0.125 (8 slots)
  const y = Math.max(0.05, Math.min(0.75, Math.round(pos.y * 8) / 8))
  return { x: parseFloat(x.toFixed(3)), y: parseFloat(y.toFixed(3)) }
}

export function isSlotOccupied(pos, buildings = [], excludeId = null, threshold = 0.02) {
  return buildings.some((b) => {
    if (excludeId && b.id === excludeId) return false
    const bx = b.position?.x ?? 0
    const by = b.position?.y ?? 0
    return Math.abs(bx - pos.x) < threshold && Math.abs(by - pos.y) < threshold
  })
}

export function findNearestFreeSlot(position, buildings = [], excludeId = null) {
  const snappedTarget = snapPosition(position)
  
  if (!isSlotOccupied(snappedTarget, buildings, excludeId)) {
    return snappedTarget
  }
  
  const candidates = []
  const xSteps = [-3, -2, -1, 0, 1, 2, 3]
  const ySteps = [-3, -2, -1, 0, 1, 2, 3]
  
  for (const dx of xSteps) {
    for (const dy of ySteps) {
      if (dx === 0 && dy === 0) continue
      
      const candidateX = snappedTarget.x + dx * 0.1
      const candidateY = snappedTarget.y + dy * 0.125
      
      const clampedX = Math.max(0.05, Math.min(0.85, candidateX))
      const clampedY = Math.max(0.05, Math.min(0.75, candidateY))
      
      const candidate = {
        x: parseFloat(clampedX.toFixed(3)),
        y: parseFloat(clampedY.toFixed(3))
      }
      
      const dist = Math.hypot(candidate.x - position.x, candidate.y - position.y)
      candidates.push({ candidate, dist })
    }
  }
  
  candidates.sort((a, b) => a.dist - b.dist)
  
  for (const item of candidates) {
    if (!isSlotOccupied(item.candidate, buildings, excludeId)) {
      return item.candidate
    }
  }
  
  return snappedTarget
}

export function createPlacedBuilding(definition, position) {
  const snappedPosition = snapPosition(position)
  return {
    id: `${definition.id}-${Date.now()}`,
    type: definition.type,
    name: definition.name,
    icon: definition.icon,
    cost: definition.cost,
    effect: definition.effect,
    position: snappedPosition,
    level: 1,
  }
}

export function getMissionProgress(mission, buildings = [], stats = {}) {
  const buildingCount = (type) => buildings.filter((b) => b.type === type).length

  switch (mission.id) {
    case 1:
      return Math.min(100, ((buildingCount('solarPanel') > 0 ? 50 : 0) + Math.min(50, ((stats.energy || 0) / 120) * 50)))
    case 2:
      return Math.min(100, ((buildingCount('farm') > 0 ? 50 : 0) + Math.min(50, ((stats.food || 0) / 120) * 50)))
    case 3:
      return Math.min(100, ((buildingCount('researchLab') > 0 ? 50 : 0) + Math.min(50, ((stats.innovation || 0) / 80) * 50)))
    case 4:
      return Math.min(100, ((stats.environment || 0) / 130) * 100)
    case 5:
      return Math.min(100, ((stats.happiness || 0) / 130) * 100)
    case 6: {
      const statProgress = ['energy', 'food', 'happiness', 'environment', 'innovation']
        .reduce((sum, key) => sum + Math.min(100, ((stats[key] || 0) / 110) * 100), 0) / 5
      const buildProgress = Math.min(100, (buildings.length / 5) * 100)
      return Math.min(100, (statProgress + buildProgress) / 2)
    }
    default:
      return mission.completed ? 100 : 0
  }
}

export function filterMissionsByAgeMode(missions, ageMode = 'creator') {
  const modeOrder = { explorer: 0, creator: 1, innovator: 2 }
  const playerLevel = modeOrder[ageMode] ?? 1
  return missions.filter((m) => (modeOrder[m.minAgeMode] ?? 1) <= playerLevel)
}