import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Star } from 'lucide-react'

const ITEMS = ['🐚', '⭐', '🌺', '🦀', '💎', '🐠']

export default function TapQuest({ onClose, onComplete }) {
  const [score, setScore] = useState(0)
  const [target, setTarget] = useState({ x: 50, y: 50, emoji: '🐚' })
  const [timeLeft, setTimeLeft] = useState(15)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (done || timeLeft <= 0) return
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [timeLeft, done])

  useEffect(() => {
    if (timeLeft <= 0 && !done) {
      setDone(true)
      onComplete?.(score)
    }
  }, [timeLeft, done, score, onComplete])

  const spawn = () => {
    setTarget({
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 60,
      emoji: ITEMS[Math.floor(Math.random() * ITEMS.length)],
    })
  }

  const tap = () => {
    setScore((s) => s + 1)
    spawn()
  }

  useEffect(() => { spawn() }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-ocean-deep/90 backdrop-blur-md"
    >
      <div className="w-full max-w-lg glass-effect rounded-3xl overflow-hidden border border-golden-sun/30">
        <div className="flex justify-between items-center p-4 border-b border-white/10">
          <h3 className="font-bold flex items-center gap-2">👆 Tap Quest</h3>
          <div className="flex items-center gap-4">
            <span className="text-golden-sun font-bold">{timeLeft}s</span>
            <span className="flex items-center gap-1"><Star size={16} className="text-island-blue" />{score}</span>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg"><X size={18} /></button>
          </div>
        </div>

        <div className="relative h-72 md:h-80 bg-gradient-to-b from-island-blue/10 to-ocean-deep">
          {done ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold mb-2">{score} taps!</p>
              <button onClick={onClose} className="premium-button-primary mt-4">Nice job!</button>
            </div>
          ) : (
            <motion.button
              key={`${target.x}-${target.y}`}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              onClick={tap}
              className="absolute text-5xl md:text-6xl -translate-x-1/2 -translate-y-1/2 select-none"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
            >
              {target.emoji}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
