import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy } from 'lucide-react'

const QUESTIONS = [
  { q: 'What powers a Solar Panel on your island?', options: ['☀️ Sun', '🌧️ Rain', '❄️ Snow'], answer: 0 },
  { q: 'Which building grows food?', options: ['🏥 Hospital', '🌾 Farm', '🏫 School'], answer: 1 },
  { q: 'What does React help you build?', options: ['🏝️ Islands', '🌐 Websites', '🚗 Cars'], answer: 1 },
  { q: 'Happy citizens need…', options: ['🏥 Parks & care', '💨 Pollution', '🔥 Fire'], answer: 0 },
]

export default function QuizArena({ onClose, onComplete }) {
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [done, setDone] = useState(false)

  const question = QUESTIONS[index]

  const pick = (i) => {
    if (selected !== null) return
    setSelected(i)
    const correct = i === question.answer
    if (correct) setScore((s) => s + 1)
    setTimeout(() => {
      if (index + 1 >= QUESTIONS.length) {
        setDone(true)
        onComplete?.(score + (correct ? 1 : 0))
      } else {
        setIndex((n) => n + 1)
        setSelected(null)
      }
    }, 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-ocean-deep/90 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="w-full max-w-lg glass-effect rounded-3xl p-6 md:p-8 border border-island-blue/30"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">🎯 Quiz Arena</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X size={20} /></button>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="done" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center py-8">
              <Trophy size={48} className="mx-auto text-golden-sun mb-4" />
              <h4 className="text-2xl font-bold mb-2">Quiz Complete!</h4>
              <p className="text-text-secondary mb-6">{score} / {QUESTIONS.length} correct</p>
              <button onClick={onClose} className="premium-button-primary px-8">Awesome!</button>
            </motion.div>
          ) : (
            <motion.div key={index} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <p className="text-sm text-island-blue mb-2">Question {index + 1}/{QUESTIONS.length}</p>
              <h4 className="text-lg font-bold mb-6">{question.q}</h4>
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => pick(i)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selected === null
                        ? 'border-white/10 hover:border-island-blue/50 hover:bg-white/5'
                        : i === question.answer
                          ? 'border-tropical-green bg-tropical-green/20'
                          : selected === i
                            ? 'border-coral-alert bg-coral-alert/20'
                            : 'border-white/5 opacity-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
