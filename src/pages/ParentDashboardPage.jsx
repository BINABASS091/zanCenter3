import { motion } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import { useGameStore } from '../store/gameStore'
import { getCourseProgress } from '../data/reactCourse'
import { Download, Bell, Calendar, Heart, ShieldCheck, TrendingUp, BookOpen, Award, MapPin } from 'lucide-react'

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function ParentDashboardPage() {
  const {
    userName, level, totalXP, xp,
    buildings = [], completedMissions = [], unlockedAchievements = [],
    learningStreak, reactCourseProgress = {}, exploredZones = [],
    ageMode, lastDailyRewardDate,
  } = useGameStore()

  const course = getCourseProgress(reactCourseProgress)

  const weeklyProgressPercent = Math.min(100, Math.round(
    ((completedMissions.length * 20) + (course.percent * 0.5) + (Math.min(learningStreak, 5) * 6)) / 1.7
  ))

  const wellbeing = learningStreak >= 3 ? 'Excellent' : learningStreak >= 1 ? 'Healthy' : 'Getting Started'

  const today = new Date().toDateString()
  const hasClaimedToday = lastDailyRewardDate === today
  const alertCount = !hasClaimedToday ? 1 : 0

  const ageModeLabel = ageMode === 'explorer' ? 'Explorer (5–8)' : ageMode === 'creator' ? 'Creator (9–12)' : 'Innovator (13–16)'

  const progressItems = [
    {
      label: 'Learning',
      value: Math.min(100, Math.round((course.percent * 0.6) + (totalXP / 100))),
      color: 'from-island-blue to-tropical-green',
    },
    {
      label: 'Island Building',
      value: Math.min(100, Math.round((buildings.length / 10) * 100)),
      color: 'from-tropical-green to-golden-sun',
    },
    {
      label: 'Missions & Exploration',
      value: Math.min(100, Math.round(((completedMissions.length + exploredZones.length) / 10) * 100)),
      color: 'from-golden-sun to-coral-alert',
    },
  ]

  const exportSummary = () => {
    const lines = [
      '=== Zanzibar.Center Parent Progress Summary ===',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      `Child: ${userName}`,
      `Age Mode: ${ageModeLabel}`,
      `Level: ${level} | Total XP: ${totalXP}`,
      `Learning Streak: ${learningStreak} day${learningStreak !== 1 ? 's' : ''}`,
      '',
      `Weekly Progress: ${weeklyProgressPercent}%`,
      `Missions Completed: ${completedMissions.length}`,
      `Zones Explored: ${exploredZones.length}`,
      `React Course: ${course.percent}% complete (${course.completed}/${course.total} lessons)`,
      `Island Buildings: ${buildings.length}`,
      '',
      `Achievements Unlocked: ${unlockedAchievements.length}`,
      ...unlockedAchievements.map((a) => `  ★ ${a.title}`),
      '',
      'Note: Progress is tracked automatically through gameplay. No manual input required.',
    ]
    downloadTextFile(`${userName.replace(/\s+/g, '-')}-progress-summary.txt`, lines.join('\n'))
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Parent Dashboard</h1>
          <p className="text-text-secondary text-lg">
            Monitoring <span className="text-white font-semibold">{userName}</span>'s learning journey — {ageModeLabel} mode
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Weekly Progress', value: `${weeklyProgressPercent}%`, icon: <TrendingUp size={22} />, color: 'text-island-blue' },
            { label: 'Wellbeing', value: wellbeing, icon: <Heart size={22} />, color: 'text-tropical-green' },
            { label: 'Alerts', value: alertCount.toString(), icon: <Bell size={22} />, color: alertCount > 0 ? 'text-coral-alert' : 'text-text-secondary' },
            { label: 'Streak', value: `${learningStreak} day${learningStreak !== 1 ? 's' : ''}`, icon: <Calendar size={22} />, color: 'text-golden-sun' },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${item.color}`}>{item.icon}</div>
                <span className="text-xs text-text-secondary bg-white/5 px-2 py-0.5 rounded-full">Live</span>
              </div>
              <p className="text-text-secondary text-sm mb-1">{item.label}</p>
              <p className="text-3xl font-bold">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Breakdown */}
          <div className="lg:col-span-2 premium-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck size={24} className="text-tropical-green" /> Progress Overview
            </h2>
            <div className="space-y-5">
              {progressItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{item.label}</span>
                    <span className="text-text-secondary">{item.value}%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            {[
              { icon: <BookOpen size={18} />, label: 'React Course', value: `${course.percent}% complete`, sub: `${course.completed} of ${course.total} lessons` },
              { icon: <MapPin size={18} />, label: 'Zones Explored', value: `${exploredZones.length} discovered`, sub: 'Island exploration activity' },
              { icon: <Award size={18} />, label: 'Achievements', value: `${unlockedAchievements.length} earned`, sub: 'Milestone badges unlocked' },
            ].map((stat) => (
              <div key={stat.label} className="premium-card rounded-xl p-5 flex items-start gap-4">
                <div className="text-island-blue mt-0.5">{stat.icon}</div>
                <div>
                  <p className="text-xs text-text-secondary mb-0.5">{stat.label}</p>
                  <p className="font-bold">{stat.value}</p>
                  <p className="text-xs text-text-secondary">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export */}
        <div className="premium-card rounded-2xl p-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <Download size={24} className="text-island-blue" /> Progress Export
              </h2>
              <p className="text-text-secondary text-sm max-w-md">
                Download a complete progress summary for {userName} — suitable for school records, parent-teacher meetings, or home review.
              </p>
            </div>
            <button onClick={exportSummary} className="premium-button-primary flex items-center gap-2 px-6 py-3 shrink-0">
              <Download size={16} /> Download Summary
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
