import { motion } from 'framer-motion'

export default function FloatingActionButton({ icon = '✨', label, onClick, className = '' }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`fixed bottom-6 left-6 z-40 glass-effect rounded-full px-5 py-4 flex items-center gap-3 shadow-premium ${className}`}
    >
      <span className="text-xl">{icon}</span>
      {label && <span className="font-semibold text-white">{label}</span>}
    </motion.button>
  )
}
