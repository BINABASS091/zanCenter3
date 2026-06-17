import { motion } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import XPBar from '../components/XPBar'
import ProgressRing from '../components/ProgressRing'
import { useGameStore, useUIStore } from '../store/gameStore'
import { useAgeMode } from '../hooks/useAgeMode'
import { getCourseProgress } from '../data/reactCourse'
import { User, BadgeCheck, Download, Share2 } from 'lucide-react'

export default function ProfilePage() {
  const {
    userName, level, xp, totalXP, buildings = [], totalAchievements = [],
    unlockedAchievements = [], learningStreak, reactCourseProgress = {},
    completedMissions = [], exploredZones = [],
  } = useGameStore()
  const { addNotification } = useUIStore()
  const { mode } = useAgeMode()
  const course = getCourseProgress(reactCourseProgress)

  const publishedProjects = Math.min(
    Object.keys(reactCourseProgress).filter((k) => reactCourseProgress[k]?.completed).length > 0 ? 1 : 0
    + (reactCourseProgress['l4-3']?.completed ? 1 : 0)
    + (reactCourseProgress['l5-2']?.completed ? 1 : 0)
    + (reactCourseProgress['l7-3']?.completed ? 1 : 0),
    4
  )

  const learningPercent = Math.min(100, Math.round((totalXP / Math.max(totalXP + 500, 2000)) * 100))
  const creativityPercent = Math.min(100, Math.round((buildings.length / 10) * 100))
  const consistencyPercent = Math.min(100, Math.round((learningStreak / 7) * 100))

  const exportProfile = () => {
    const lines = [
      `=== ${userName}'s Zanzibar.Center Profile ===`,
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      `Level: ${level} | Total XP: ${totalXP}`,
      `Mode: ${mode.label} (Ages ${mode.ages})`,
      `Learning Streak: ${learningStreak} day${learningStreak !== 1 ? 's' : ''}`,
      '',
      `Island Buildings: ${buildings.length}`,
      `Zones Explored: ${exploredZones.length}`,
      `Missions Completed: ${completedMissions.length}`,
      `React Course: ${course.percent}% complete`,
      `Projects Published: ${publishedProjects}`,
      '',
      `Achievements Unlocked: ${unlockedAchievements.length}/${totalAchievements.length}`,
      ...unlockedAchievements.map((a) => `  ★ ${a.title}`),
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${userName.replace(/\s+/g, '-')}-profile.txt`
    link.click()
    URL.revokeObjectURL(url)
    addNotification({ type: 'success', title: 'Profile exported!', message: 'Your profile has been downloaded.' })
  }

  const shareProfile = async () => {
    const text = `🌴 ${userName} is Level ${level} on Zanzibar.Center!\n${unlockedAchievements.length} achievements · ${learningStreak} day streak 🔥\nzanzibar.center`
    if (navigator.share) {
      try {
        await navigator.share({ title: `${userName}'s Profile`, text, url: 'https://zanzibar.center' })
      } catch {
        // cancelled
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      addNotification({ type: 'success', title: 'Profile link copied!', message: 'Share text copied to clipboard.' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Profile</h1>
          <p className="text-text-secondary text-lg">Your learning identity and personal achievements</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="premium-card rounded-2xl p-8 text-center">
            <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-island-blue to-tropical-green flex items-center justify-center text-5xl mb-5">
              <User size={48} />
            </div>
            <h2 className="text-2xl font-bold mb-1">{userName}</h2>
            <p className="text-text-secondary mb-2">{mode.label}</p>
            <p className="text-xs text-island-blue mb-6">Ages {mode.ages} · {learningStreak} day streak 🔥</p>
            <XPBar currentXP={xp} level={level} />
            <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
              <div className="glass-effect rounded-xl p-4"><p className="text-text-secondary">Level</p><p className="text-2xl font-bold">{level}</p></div>
              <div className="glass-effect rounded-xl p-4"><p className="text-text-secondary">XP</p><p className="text-2xl font-bold">{totalXP}</p></div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={exportProfile} className="flex-1 premium-button-secondary flex items-center justify-center gap-2"><Download size={16} /> Export</button>
              <button onClick={shareProfile} className="flex-1 premium-button-primary flex items-center justify-center gap-2"><Share2 size={16} /> Share</button>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            <div className="premium-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Progress Overview</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <ProgressRing percentage={learningPercent} size={140} color="#00D4FF" label="Learning" value="Progress" />
                <ProgressRing percentage={creativityPercent} size={140} color="#2EE59D" label="Creativity" value="Growth" />
                <ProgressRing percentage={consistencyPercent} size={140} color="#FFCC00" label="Consistency" value="Streak" />
              </div>
            </div>

            <div className="premium-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><BadgeCheck size={24} /> Achievements</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {totalAchievements.map((ach) => {
                  const isUnlocked = unlockedAchievements.some((ua) => ua.id === ach.id)
                  return (
                    <div key={ach.id} className={`glass-effect rounded-xl p-4 flex items-center justify-between transition-all ${isUnlocked ? 'border border-tropical-green border-opacity-30' : 'opacity-50'}`}>
                      <span className="flex items-center gap-2">
                        <span>{ach.icon}</span>
                        <span className={isUnlocked ? 'text-white font-medium' : 'text-text-secondary line-through'}>{ach.title}</span>
                      </span>
                      {isUnlocked ? (
                        <span className="text-golden-sun">🏆</span>
                      ) : (
                        <span className="text-text-secondary text-xs">🔒</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="premium-card rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Island Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Buildings', value: buildings.length || 0 },
                  { label: 'Projects', value: publishedProjects },
                  { label: 'Achievements', value: unlockedAchievements.length },
                  { label: 'Missions Done', value: completedMissions.length },
                ].map((item) => (
                  <div key={item.label} className="glass-effect rounded-xl p-4 text-center">
                    <p className="text-text-secondary text-xs">{item.label}</p>
                    <p className="text-2xl font-bold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
