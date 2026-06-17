import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TopNavigation from '../components/TopNavigation'
import ProgressRing from '../components/ProgressRing'
import StatusPanel from '../components/StatusPanel'
import XPTracker from '../components/XPTracker'
import MissionCard from '../components/MissionCard'
import DailyRewardCard from '../components/DailyRewardCard'
import LeaderboardPanel from '../components/LeaderboardPanel'
import { useGameStore, useUIStore } from '../store/gameStore'
import { useAgeMode } from '../hooks/useAgeMode'
import { getMissionProgress } from '../utils/gameLogic'
import { getCourseProgress } from '../data/reactCourse'
import { SEASONAL_EVENT } from '../data/gameHub'

export default function DashboardPage() {
  const navigate = useNavigate()
  const { openMissionDetails } = useUIStore()
  const { mode } = useAgeMode()
  const {
    userName, energy, food, happiness, environment, innovation,
    buildings, activeMissions, completedMissions, reactCourseProgress, exploredZones,
  } = useGameStore()

  const courseProgress = getCourseProgress(reactCourseProgress)

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            {userName}'s Island Hub {mode.emoji}
          </h1>
          <p className="text-text-secondary text-lg">{mode.tagline}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`rounded-2xl p-4 md:p-5 mb-6 bg-gradient-to-r ${SEASONAL_EVENT.theme} border border-white/10 flex flex-wrap items-center justify-between gap-3`}
        >
          <div>
            <p className="text-xs text-golden-sun font-bold uppercase">{SEASONAL_EVENT.emoji} {SEASONAL_EVENT.title}</p>
            <p className="text-sm text-text-secondary">{SEASONAL_EVENT.subtitle}</p>
          </div>
          <button onClick={() => navigate('/hub')} className="premium-button-primary text-sm px-5 py-2">
            Join Event →
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2"><XPTracker /></div>
          <DailyRewardCard />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { emoji: '🎮', label: 'Game Hub', path: '/hub', stat: 'Play mini-games' },
            { emoji: '🏗️', label: 'Build Island', path: '/island', stat: `${buildings.length} buildings` },
            { emoji: '⚛️', label: 'React Course', path: '/react-course', stat: `${courseProgress.percent}% done` },
            { emoji: '🗺️', label: 'Explore', path: '/explore', stat: `${exploredZones.length} zones` },
          ].map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(item.path)}
              className="premium-card rounded-2xl p-5 text-left hover:shadow-premium transition-all"
            >
              <span className="text-3xl block mb-2">{item.emoji}</span>
              <p className="font-bold">{item.label}</p>
              <p className="text-xs text-text-secondary mt-1">{item.stat}</p>
            </motion.button>
          ))}
        </div>

        <StatusPanel className="mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          <div className="premium-card rounded-2xl p-6 flex flex-col items-center">
            <h3 className="font-bold mb-4">Environment</h3>
            <ProgressRing percentage={environment} size={120} color="#2EE59D" label="Eco Score" />
          </div>
          <div className="premium-card rounded-2xl p-6 flex flex-col items-center">
            <h3 className="font-bold mb-4">Happiness</h3>
            <ProgressRing percentage={happiness} size={120} color="#FF5C5C" label="Citizens" />
          </div>
          <div className="premium-card rounded-2xl p-6 flex flex-col items-center">
            <h3 className="font-bold mb-4">React Progress</h3>
            <ProgressRing percentage={courseProgress.percent} size={120} color="#00D4FF" label="Web Dev" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">Island Missions</h2>
              <span className="text-sm text-text-secondary">{completedMissions.length} done</span>
            </div>
            <div className="space-y-3">
              {activeMissions.slice(0, 4).map((mission) => {
                const stats = { energy, food, happiness, environment, innovation }
                const progress = mission.completed ? 100 : Math.round(getMissionProgress(mission, buildings, stats))
                return (
                  <MissionCard
                    key={mission.id}
                    title={mission.title}
                    description={mission.description}
                    reward={mission.reward}
                    difficulty={mission.difficulty}
                    status={mission.completed ? 'completed' : 'active'}
                    progress={progress}
                    onView={() => openMissionDetails(mission)}
                    onStart={() => openMissionDetails(mission)}
                  />
                )
              })}
            </div>
          </div>
          <LeaderboardPanel />
        </div>
      </main>
    </div>
  )
}
