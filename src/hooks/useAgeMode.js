import { useGameStore } from '../store/gameStore'
import { getAgeMode } from '../config/ageModes'

export function useAgeMode() {
  const ageMode = useGameStore((s) => s.ageMode)
  const setAgeMode = useGameStore((s) => s.setAgeMode)
  const mode = getAgeMode(ageMode || 'creator')

  return {
    ageMode: ageMode || 'creator',
    mode,
    setAgeMode,
    isExplorer: ageMode === 'explorer',
    isCreator: ageMode === 'creator' || !ageMode,
    isInnovator: ageMode === 'innovator',
    uiScale: mode.uiScale,
    codingLevel: mode.codingLevel,
  }
}
