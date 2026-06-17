import { useMemo } from 'react'
import { useGameStore } from '../store/gameStore'
import { getCoachContext, getCoachQuickReplies } from '../services/coachService'

export function useCoach() {
  const gameState = useGameStore()
  const context = useMemo(() => getCoachContext(gameState), [gameState])
  const quickReplies = useMemo(() => getCoachQuickReplies(gameState.ageMode), [gameState.ageMode])

  return { context, quickReplies, ageMode: gameState.ageMode }
}
