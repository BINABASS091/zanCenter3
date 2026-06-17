import { useState } from 'react'
import { motion } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import ReactLessonPlayer from '../components/ReactLessonPlayer'
import { REACT_COURSE, filterModulesByAge, getCourseProgress } from '../data/reactCourse'
import { useGameStore } from '../store/gameStore'
import { useAgeMode } from '../hooks/useAgeMode'
import { Code2, Lock, CheckCircle, Globe, Award } from 'lucide-react'

export default function ReactCoursePage() {
  const { ageMode, mode } = useAgeMode()
  const { reactCourseProgress, level } = useGameStore()
  const [activeLesson, setActiveLesson] = useState(null)

  const modules = filterModulesByAge(REACT_COURSE.modules, ageMode)
  const progress = getCourseProgress(reactCourseProgress)

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />
      {activeLesson && (
        <ReactLessonPlayer lesson={activeLesson} onClose={() => setActiveLesson(null)} />
      )}

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 md:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Code2 className="text-island-blue" size={32} />
            <h1 className="text-3xl md:text-5xl font-bold">{REACT_COURSE.title}</h1>
          </div>
          <p className="text-text-secondary text-lg mb-4">{REACT_COURSE.subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <span className="glass-effect px-3 py-1 rounded-full text-sm">{mode.emoji} {mode.label}</span>
            <span className="glass-effect px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Globe size={14} /> International · EN
            </span>
            <span className="glass-effect px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Award size={14} /> Final: {REACT_COURSE.finalProject}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card rounded-2xl p-5 md:p-6 mb-8"
        >
          <div className="flex justify-between text-sm mb-2">
            <span>Course Progress</span>
            <span className="text-island-blue font-bold">{progress.percent}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-island-blue to-tropical-green rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percent}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-xs text-text-secondary mt-2">
            {progress.completed} / {progress.total} lessons · Level {level} required for advanced modules
          </p>
        </motion.div>

        <div className="space-y-6">
          {modules.map((module, mi) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mi * 0.08 }}
              className="premium-card rounded-2xl p-5 md:p-6"
            >
              <h2 className="text-xl font-bold mb-1">{module.title}</h2>
              <p className="text-text-secondary text-sm mb-4">{module.description}</p>
              <div className="space-y-2">
                {module.lessons.map((lesson) => {
                  const completed = reactCourseProgress[lesson.id]?.completed
                  const locked = module.minAgeMode === 'innovator' && level < 3 && lesson.id.startsWith('l6')
                  return (
                    <button
                      key={lesson.id}
                      disabled={locked}
                      onClick={() => !locked && setActiveLesson({ ...lesson, moduleId: module.id })}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                        locked
                          ? 'border-white/5 opacity-40 cursor-not-allowed'
                          : completed
                            ? 'border-tropical-green/30 bg-tropical-green/5 hover:bg-tropical-green/10'
                            : 'border-white/10 hover:border-island-blue/40 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-2xl">{lesson.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{lesson.title}</p>
                        <p className="text-xs text-text-secondary">{lesson.duration} · +{lesson.xp} XP</p>
                      </div>
                      {locked ? (
                        <Lock size={18} className="text-text-secondary" />
                      ) : completed ? (
                        <CheckCircle size={20} className="text-tropical-green" />
                      ) : (
                        <span className="text-island-blue text-sm font-semibold">Start →</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {ageMode === 'explorer' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-text-secondary text-sm mt-8 glass-effect rounded-xl p-4"
          >
            🟡 Explorer mode: story lessons now! Switch to Creator or Innovator mode in your profile to unlock full React coding.
          </motion.p>
        )}
      </main>
    </div>
  )
}
