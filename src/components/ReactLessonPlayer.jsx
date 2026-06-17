import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, CircleCheck as CheckCircle, BookOpen, Eye, Code, Palette, Film, Layers, Rocket } from 'lucide-react'
import { LESSON_SNIPPETS } from '../data/reactCourse'
import { useGameStore, useUIStore } from '../store/gameStore'

const LESSON_TYPE_META = {
  story: {
    icon: BookOpen,
    color: 'text-island-blue',
    label: 'Story',
    getContent: (lesson) =>
      `${lesson.title} — In this lesson, you'll discover how the web works through an immersive story. Think of websites as digital islands — each page is a place visitors can explore. React helps you build those places with reusable components!`,
  },
  visual: {
    icon: Eye,
    color: 'text-tropical-green',
    label: 'Visual',
    getContent: (lesson) =>
      `${lesson.title} — This is a visual lesson. You'll see diagrams and interactive examples that show exactly how ${lesson.title.toLowerCase()} works in real websites. Follow along and take mental notes!`,
  },
  code: {
    icon: Code,
    color: 'text-golden-sun',
    label: 'Coding',
    getContent: (lesson) =>
      `${lesson.title} — Time to write real code! You'll practice ${lesson.title.toLowerCase()} using an editor. Read the challenge, type your solution, then hit "Run & Complete" to earn your XP.`,
  },
  interactive: {
    icon: Layers,
    color: 'text-coral-alert',
    label: 'Interactive',
    getContent: (lesson) =>
      `${lesson.title} — Hands-on practice time! In this interactive lesson, you'll experiment with ${lesson.title.toLowerCase()} and see the results live. The best way to learn is by doing!`,
  },
  video: {
    icon: Film,
    color: 'text-island-blue',
    label: 'Video',
    getContent: (lesson) =>
      `${lesson.title} — Watch and learn! This short video lesson walks you through ${lesson.title.toLowerCase()} step by step. Pay attention to the examples — you'll use these concepts in upcoming coding challenges.`,
  },
  creative: {
    icon: Palette,
    color: 'text-tropical-green',
    label: 'Creative',
    getContent: (lesson) =>
      `${lesson.title} — Unleash your creativity! In this lesson, you'll design and plan ${lesson.title.toLowerCase()}. There's no single right answer — your vision is what matters here.`,
  },
  project: {
    icon: Rocket,
    color: 'text-golden-sun',
    label: 'Project',
    getContent: (lesson) =>
      `${lesson.title} — This is a project lesson! You'll apply everything you've learned to build something real. Take your time, think through the steps, and remember — every expert was once a beginner.`,
  },
}

export default function ReactLessonPlayer({ lesson, onClose }) {
  const { completeReactLesson } = useGameStore()
  const { addNotification } = useUIStore()
  const snippet = LESSON_SNIPPETS[lesson?.id]
  const [code, setCode] = useState(snippet?.starter || `// ${lesson?.title}\n// Write your code here...`)
  const [phase, setPhase] = useState(snippet ? 'code' : 'learn')
  const [done, setDone] = useState(false)

  if (!lesson) return null

  const meta = LESSON_TYPE_META[lesson.type] || LESSON_TYPE_META.code
  const TypeIcon = meta.icon

  const runLesson = () => {
    if (snippet && !snippet.validate(code)) {
      addNotification({ type: 'error', title: 'Not quite!', message: snippet.hint })
      return
    }
    setDone(true)
    completeReactLesson(lesson.id, lesson.xp)
    addNotification({ type: 'success', title: 'Lesson complete!', message: `+${lesson.xp} XP — ${lesson.title}` })
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-ocean-deep/90 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-effect rounded-3xl border border-island-blue/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 md:p-6 border-b border-white/10 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-island-blue font-semibold">⚛️ React Course</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-white/10 flex items-center gap-1 ${meta.color}`}>
                  <TypeIcon size={11} /> {meta.label}
                </span>
              </div>
              <h3 className="text-xl font-bold">{lesson.title}</h3>
              <p className="text-sm text-text-secondary">{lesson.duration} · +{lesson.xp} XP</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X size={20} /></button>
          </div>

          {/* Body */}
          <div className="p-5 md:p-6">
            {done ? (
              <div className="text-center py-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle size={64} className="mx-auto text-tropical-green mb-4" />
                </motion.div>
                <h4 className="text-2xl font-bold mb-2">Lesson Complete!</h4>
                <p className="text-text-secondary mb-2">You earned <span className="text-golden-sun font-bold">+{lesson.xp} XP</span></p>
                <p className="text-sm text-text-secondary mb-8">Great work on <span className="text-white">{lesson.title}</span> — keep going!</p>
                <button onClick={onClose} className="premium-button-primary px-10 py-3">Continue</button>
              </div>
            ) : phase === 'learn' ? (
              <div>
                <div className="flex justify-center mb-6">
                  <motion.span
                    className="text-6xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    {lesson.icon}
                  </motion.span>
                </div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 ${meta.color}`}>
                  <TypeIcon size={14} />
                  <span className="text-xs font-semibold">{meta.label} Lesson</span>
                </div>
                <p className="text-text-secondary leading-relaxed text-base mb-8">
                  {meta.getContent(lesson)}
                </p>
                <button
                  onClick={() => (snippet ? setPhase('code') : runLesson())}
                  className="premium-button-primary w-full flex items-center justify-center gap-2 py-3"
                >
                  {snippet ? (
                    <><Code size={18} /> Start Coding Challenge</>
                  ) : (
                    <><CheckCircle size={18} /> Complete Lesson & Earn {lesson.xp} XP</>
                  )}
                </button>
              </div>
            ) : (
              <div>
                {snippet?.challenge && (
                  <div className="glass-effect rounded-xl p-4 mb-4 border border-golden-sun/20">
                    <p className="text-xs text-golden-sun font-bold uppercase mb-1">Challenge</p>
                    <p className="text-sm text-white">{snippet.challenge}</p>
                  </div>
                )}
                <div className="relative">
                  <div className="absolute top-3 right-3 text-xs text-text-secondary font-mono">JavaScript</div>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-52 md:h-64 font-mono text-sm bg-ocean-deep/80 border border-white/10 rounded-xl p-4 pt-8 text-tropical-green focus:outline-none focus:ring-2 focus:ring-island-blue/50 resize-none"
                    spellCheck={false}
                  />
                </div>
                {snippet?.hint && (
                  <p className="text-xs text-text-secondary mt-2 flex items-start gap-1.5">
                    <span className="text-golden-sun mt-0.5">💡</span>
                    <span>Hint: {snippet.hint}</span>
                  </p>
                )}
                <div className="flex gap-3 mt-4">
                  <button onClick={runLesson} className="premium-button-primary flex-1 flex items-center justify-center gap-2 py-3">
                    <Play size={18} /> Run & Complete
                  </button>
                  <button
                    onClick={() => setCode(snippet?.starter || `// ${lesson.title}\n// Write your code here...`)}
                    className="premium-button-secondary px-4"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
