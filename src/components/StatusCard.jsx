import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatusCard({ label, value, icon, trend = 0, color = 'island-blue', interactive = false }) {
  const getColorClasses = (colorName) => {
    const colors = {
      'island-blue': 'text-island-blue from-island-blue to-blue-400',
      'tropical-green': 'text-tropical-green from-tropical-green to-green-400',
      'golden-sun': 'text-golden-sun from-golden-sun to-yellow-400',
      'coral-alert': 'text-coral-alert from-coral-alert to-red-400',
    }
    return colors[colorName] || colors['island-blue']
  }

  const colorClass = getColorClasses(color)
  const isPositive = trend > 0

  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : {}}
      className={`premium-card group cursor-pointer ${interactive ? 'hover:shadow-premium' : ''}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`text-3xl ${colorClass.split(' ')[0]}`}>
          {icon}
        </div>
        {trend !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-tropical-green' : 'text-coral-alert'}`}>
            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-text-secondary text-sm mb-1">{label}</p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-3xl font-bold bg-gradient-to-r ${colorClass.split(' ').slice(1).join(' ')} bg-clip-text text-transparent`}
      >
        {value}
      </motion.p>
    </motion.div>
  )
}
