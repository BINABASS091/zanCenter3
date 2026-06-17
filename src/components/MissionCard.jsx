import { motion } from 'framer-motion'
import { Star, CheckCircle, ChevronRight } from 'lucide-react'

export default function MissionCard({ 
  title, 
  description, 
  reward,
  difficulty = 'easy', // easy, medium, hard
  status = 'active', // active, completed, locked
  progress = 0,
  onStart,
  onView
}) {
  const difficultyColors = {
    easy: 'text-tropical-green',
    medium: 'text-golden-sun',
    hard: 'text-coral-alert',
  }

  const statusColors = {
    active: 'border-island-blue',
    completed: 'border-tropical-green',
    locked: 'border-text-secondary opacity-50',
  }

  return (
    <motion.div
      whileHover={status !== 'locked' ? { x: 4 } : {}}
      className={`premium-card rounded-xl border-l-4 ${statusColors[status]} overflow-hidden group cursor-pointer transition-all`}
      onClick={onView}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {status === 'completed' && <CheckCircle size={18} className="text-tropical-green" />}
            <h3 className="font-bold text-white">{title}</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${difficultyColors[difficulty]}`}>
              {difficulty}
            </span>
          </div>
          <p className="text-sm text-text-secondary mb-3">{description}</p>

          {status === 'active' && (
            <div className="mb-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-text-secondary">Progress</span>
                <span className="text-xs font-semibold text-island-blue">{progress}%</span>
              </div>
              <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                <motion.div
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-island-blue to-tropical-green"
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Star size={16} className="text-golden-sun" />
              <span>{reward} XP</span>
            </div>
            {status !== 'locked' && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onStart && onStart()
                }}
                className="premium-button-primary text-xs px-4 py-2"
              >
                {status === 'completed' ? 'Completed' : 'Start'} <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
