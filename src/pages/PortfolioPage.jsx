import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import TopNavigation from '../components/TopNavigation'
import AchievementCard from '../components/AchievementCard'
import { Download, Share2, Code as Code2, ExternalLink, X, CircleCheck as CheckCircle } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { useUIStore } from '../store/gameStore'
import { getCourseProgress } from '../data/reactCourse'

const PORTFOLIO_PROJECTS = [
  {
    id: 'p1',
    name: 'My First React Page',
    description: 'A hello-world component built in Module 3',
    thumbnail: '⚛️',
    tech: ['React', 'JSX'],
    status: 'published',
    requiresLessons: ['l3-3'],
  },
  {
    id: 'p2',
    name: 'Component Library',
    description: 'Reusable buttons, cards, and navigation components',
    thumbnail: '🧩',
    tech: ['React', 'Props', 'Tailwind'],
    status: 'published',
    requiresLessons: ['l4-3'],
  },
  {
    id: 'p3',
    name: 'Interactive Dashboard',
    description: 'A website with useState and click handlers',
    thumbnail: '📊',
    tech: ['React', 'useState', 'Events'],
    status: 'in-progress',
    requiresLessons: ['l5-2'],
  },
  {
    id: 'p4',
    name: 'Personal Portfolio Website',
    description: 'Capstone project — your live developer portfolio!',
    thumbnail: '🌍',
    tech: ['React', 'Router', 'Tailwind', 'Deploy'],
    status: 'locked',
    requiresLessons: ['l7-3'],
  },
]

function ProjectPreviewModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ocean-deep/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="w-full max-w-2xl glass-effect rounded-3xl overflow-hidden border border-island-blue/20 shadow-premium"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{project.thumbnail}</span>
                <div>
                  <h3 className="font-bold text-xl">{project.name}</h3>
                  <p className="text-sm text-text-secondary">{project.description}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-ocean-surface to-ocean-deep border border-white/10 flex flex-col items-center justify-center mb-6">
                <motion.span
                  className="text-7xl mb-4"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {project.thumbnail}
                </motion.span>
                <p className="text-lg font-bold">{project.name}</p>
                <p className="text-sm text-text-secondary mt-1">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-island-blue/20 text-island-blue font-semibold">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-tropical-green text-sm font-semibold">
                <CheckCircle size={16} />
                <span>Project {project.status === 'published' ? 'published' : 'ready to publish'}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function PortfolioPage() {
  const { totalAchievements, unlockedAchievements, reactCourseProgress, userName } = useGameStore()
  const { addNotification } = useUIStore()
  const course = getCourseProgress(reactCourseProgress)
  const [previewProject, setPreviewProject] = useState(null)

  const projects = PORTFOLIO_PROJECTS.map((p) => {
    const unlocked = p.requiresLessons.every((id) => reactCourseProgress[id]?.completed)
    let status = p.status
    if (p.status === 'locked' && unlocked) status = 'ready'
    if (p.status === 'in-progress' && unlocked) status = 'published'
    return { ...p, status, unlocked }
  })

  const achievementsList = totalAchievements.map((ach) => ({
    ...ach,
    unlocked: unlockedAchievements.some((ua) => ua.id === ach.id),
  }))

  const exportPortfolio = () => {
    const unlockedProjectNames = projects.filter((p) => p.unlocked).map((p) => p.name)
    const unlockedAchievementNames = achievementsList.filter((a) => a.unlocked).map((a) => a.title)
    const lines = [
      `=== ${userName}'s Zanzibar.Center Portfolio ===`,
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      `React Course Progress: ${course.percent}% complete (${course.completed}/${course.total} lessons)`,
      '',
      'Projects:',
      ...projects.map((p) => `  [${p.unlocked ? '✓' : ' '}] ${p.name} — ${p.status}`),
      '',
      'Achievements Unlocked:',
      ...unlockedAchievementNames.map((t) => `  ★ ${t}`),
      '',
      `Portfolio URL: zanzibar.center/portfolio/${userName.toLowerCase().replace(/\s+/g, '-')}`,
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${userName.replace(/\s+/g, '-')}-zanzibar-portfolio.txt`
    link.click()
    URL.revokeObjectURL(url)
    addNotification({ type: 'success', title: 'Portfolio exported!', message: 'Your portfolio summary has been downloaded.' })
  }

  const sharePortfolio = async () => {
    const shareText = `🌴 Check out ${userName}'s Zanzibar.Center Portfolio!\nReact Course: ${course.percent}% complete · ${projects.filter((p) => p.unlocked).length} projects published\nzanzibar.center`
    if (navigator.share) {
      try {
        await navigator.share({ title: `${userName}'s Portfolio`, text: shareText, url: 'https://zanzibar.center' })
      } catch {
        // User cancelled share
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText)
      addNotification({ type: 'success', title: 'Link copied!', message: 'Portfolio share text copied to clipboard.' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <ProjectPreviewModal project={previewProject} onClose={() => setPreviewProject(null)} />
      <TopNavigation />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Code2 className="text-island-blue" size={28} />
            <h1 className="text-3xl md:text-5xl font-bold">My Portfolio</h1>
          </div>
          <p className="text-text-secondary text-lg">
            Websites you build in the React course — showcase your work to the world 🌍
          </p>
          <div className="mt-4 h-2 bg-white/10 rounded-full max-w-md overflow-hidden">
            <div className="h-full bg-gradient-to-r from-island-blue to-tropical-green rounded-full" style={{ width: `${course.percent}%` }} />
          </div>
          <p className="text-xs text-text-secondary mt-1">{course.completed}/{course.total} lessons · {course.percent}% to full portfolio</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`premium-card rounded-2xl p-6 ${!project.unlocked && project.status === 'locked' ? 'opacity-60' : ''}`}
            >
              <div className="flex gap-4">
                <span className="text-5xl">{project.thumbnail}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                  <p className="text-sm text-text-secondary mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-island-blue/20 text-island-blue">{t}</span>
                    ))}
                  </div>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    project.status === 'published' ? 'bg-tropical-green/20 text-tropical-green'
                      : project.status === 'ready' ? 'bg-golden-sun/20 text-golden-sun'
                        : 'bg-white/10 text-text-secondary'
                  }`}>
                    {project.status === 'locked' ? '🔒 Complete React lessons' : project.status}
                  </span>
                </div>
              </div>
              {project.unlocked && (
                <button
                  onClick={() => setPreviewProject(project)}
                  className="mt-4 w-full premium-button-secondary text-sm flex items-center justify-center gap-2 hover:border-island-blue/40 transition-all"
                >
                  <ExternalLink size={14} /> Preview Project
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 mb-10">
          <button onClick={exportPortfolio} className="premium-button-secondary flex items-center gap-2 px-5 py-3">
            <Download size={16} /> Export
          </button>
          <button onClick={sharePortfolio} className="premium-button-primary flex items-center gap-2 px-5 py-3">
            <Share2 size={16} /> Share Portfolio
          </button>
        </div>

        <div className="premium-card rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold mb-6">Game Achievements</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievementsList.map((ach) => (
              <AchievementCard
                key={ach.id}
                title={ach.title}
                description={ach.description}
                icon={ach.icon}
                unlocked={ach.unlocked}
                rarity={ach.rarity}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
