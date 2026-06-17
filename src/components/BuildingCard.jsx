import { motion } from 'framer-motion'

export default function BuildingCard({ 
  name, 
  icon, 
  description, 
  cost, 
  effect, 
  onPlace, 
  available = true,
  selected = false 
}) {
  return (
    <motion.div
      whileHover={available ? { y: -4 } : {}}
      className={`premium-card rounded-xl transition-all duration-300 cursor-pointer ${
        selected ? 'ring-2 ring-island-blue shadow-premium' : ''
      } ${!available ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => available && onPlace && onPlace()}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="text-5xl animate-float">{icon}</div>
        <div>
          <h3 className="font-bold text-white mb-1">{name}</h3>
          <p className="text-xs text-text-secondary mb-3">{description}</p>
        </div>

        {effect && (
          <div className="w-full bg-white bg-opacity-5 rounded-lg p-2 mb-2 border border-tropical-green border-opacity-30">
            <p className="text-xs font-semibold text-tropical-green">{effect}</p>
          </div>
        )}

        <div className="w-full flex items-center justify-between">
          <span className="text-sm text-text-secondary">
            💰 {cost}
          </span>
          <button
            disabled={!available}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              available
                ? 'premium-button-primary'
                : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            {available ? 'Place' : 'Locked'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
