import { BrowserRouter } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useUIStore, useGameStore } from './store/gameStore'

import AppRoutes from './routes/AppRoutes'
import AICoach from './components/AICoach'
import NotificationCenter from './components/NotificationCenter'
import MissionDetailsModal from './components/MissionDetailsModal'
import AchievementModal from './components/AchievementModal'
import AgeModeSelector from './components/AgeModeSelector'
import FloatingActionButton from './components/FloatingActionButton'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { showAICoach, addNotification, toggleAICoach, openAchievementModal } = useUIStore()
  const { completedMissions, unlockedAchievements, totalAchievements } = useGameStore()

  const previousMissionCount = useRef(completedMissions.length)
  const previousAchievementCount = useRef(unlockedAchievements.length)

  useEffect(() => {
    const timer = setTimeout(() => {
      previousMissionCount.current = completedMissions.length
      previousAchievementCount.current = unlockedAchievements.length
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [completedMissions.length, unlockedAchievements.length])

  useEffect(() => {
    if (isLoading) return
    if (completedMissions.length > previousMissionCount.current) {
      const latestMission = completedMissions[completedMissions.length - 1]
      if (latestMission) {
        addNotification({ type: 'success', title: 'Mission complete!', message: `${latestMission.title} rewards unlocked.` })
      }
    }
    previousMissionCount.current = completedMissions.length
  }, [completedMissions, addNotification, isLoading])

  useEffect(() => {
    if (isLoading) return
    if (unlockedAchievements.length > previousAchievementCount.current) {
      const latest = unlockedAchievements[unlockedAchievements.length - 1]
      if (latest) {
        const full = totalAchievements.find((a) => a.id === latest.id) || latest
        addNotification({ type: 'info', title: 'Achievement unlocked', message: latest.title })
        openAchievementModal(full)
      }
    }
    previousAchievementCount.current = unlockedAchievements.length
  }, [unlockedAchievements, totalAchievements, addNotification, openAchievementModal, isLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-ocean overflow-hidden">
        <AppRoutes />

        <AgeModeSelector />
        {showAICoach && <AICoach />}
        {!showAICoach && (
          <FloatingActionButton icon="🤖" label="Coach" onClick={toggleAICoach} />
        )}
        <NotificationCenter />
        <MissionDetailsModal />
        <AchievementModal />
      </div>
    </BrowserRouter>
  )
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 animate-bounce-in flex flex-col items-center">
          <img src="/zanzibar.Camp_logo-Photoroom.png" alt="Zanzibar.Camp" className="h-40 w-auto object-contain mb-6" />
          <p className="text-text-secondary text-lg">Loading Experience Hub...</p>
        </div>
        <div className="flex gap-2 justify-center">
          <div className="w-3 h-3 rounded-full bg-island-blue animate-pulse" />
          <div className="w-3 h-3 rounded-full bg-tropical-green animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 rounded-full bg-golden-sun animate-pulse" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  )
}
