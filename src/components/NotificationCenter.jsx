import { motion, AnimatePresence } from 'framer-motion'
import { useUIStore } from '../store/gameStore'
import { useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

export default function NotificationCenter() {
  const { notifications, removeNotification } = useUIStore()

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-tropical-green" size={20} />
      case 'error':
        return <AlertCircle className="text-coral-alert" size={20} />
      case 'info':
      default:
        return <Info className="text-island-blue" size={20} />
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed top-6 right-6 z-40 max-w-md space-y-3">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={() => removeNotification(notification.id)}
            icon={getIcon(notification.type)}
          />
        ))}
      </div>
    </AnimatePresence>
  )
}

function Notification({ notification, onClose, icon }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: -20, x: 20 }}
      className="glass-effect p-4 rounded-xl shadow-premium flex items-start gap-3"
    >
      {icon}
      <div className="flex-1 min-w-0">
        {notification.title && (
          <h4 className="font-semibold text-white text-sm mb-1">{notification.title}</h4>
        )}
        <p className="text-text-secondary text-sm">{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 p-1 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all flex-shrink-0"
      >
        <X size={16} className="text-text-secondary" />
      </button>
    </motion.div>
  )
}
