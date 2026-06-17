import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, MapPin, CheckCircle2, Rocket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useUIStore } from '../store/gameStore'

export default function MissionDetailsModal() {
  const navigate = useNavigate()
  const { showMissionDetails, selectedMission, closeMissionDetails } = useUIStore()

  if (!selectedMission) return null

  const isCompleted = !!selectedMission.completed

  return (
    <AnimatePresence>
      {showMissionDetails && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4"
          onClick={closeMissionDetails}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.92, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl premium-card rounded-3xl p-8 relative"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={closeMissionDetails}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Close mission details"
            >
              <X size={20} />
            </button>

            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-tropical-green mb-3">
                  <Rocket size={14} /> Mission Details
                </div>
                <h2 className="text-3xl font-bold mb-2">{selectedMission.title}</h2>
                <p className="text-text-secondary">{selectedMission.description}</p>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center justify-end gap-1 text-golden-sun font-bold text-xl">
                  <Star size={20} /> {selectedMission.reward} XP
                </div>
                <p className="text-xs text-text-secondary mt-1">
                  Difficulty: {selectedMission.difficulty}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="glass-effect rounded-2xl p-4">
                <p className="text-xs text-text-secondary mb-1">Status</p>
                <p className={`font-bold ${isCompleted ? 'text-tropical-green' : 'text-island-blue'}`}>
                  {isCompleted ? 'Completed' : 'Active'}
                </p>
              </div>
              <div className="glass-effect rounded-2xl p-4">
                <p className="text-xs text-text-secondary mb-1">Target</p>
                <p className="font-bold capitalize">{selectedMission.target || 'Island Growth'}</p>
              </div>
              <div className="glass-effect rounded-2xl p-4">
                <p className="text-xs text-text-secondary mb-1">Reward</p>
                <p className="font-bold">+{selectedMission.reward} XP</p>
              </div>
            </div>

            {!isCompleted && (
              <div className="glass-effect rounded-2xl p-4 mb-6 flex items-start gap-3">
                <MapPin className="text-island-blue shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-text-secondary">
                  Go to the island canvas to complete this mission. Build the required structures and watch your island progress automatically.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button onClick={closeMissionDetails} className="premium-button-secondary">
                Close
              </button>
              <button
                onClick={() => {
                  closeMissionDetails()
                  navigate('/island')
                }}
                className="premium-button-primary"
              >
                {isCompleted ? 'Review on Island' : 'Go Build'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}