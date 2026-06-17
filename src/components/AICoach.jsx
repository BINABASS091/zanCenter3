import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import { useUIStore } from '../store/gameStore'
import { useState } from 'react'
import { useCoach } from '../hooks/useCoach'
import { getEmotionEmoji, getQuickReplyResponse } from '../services/coachService'

export default function AICoach() {
  const { toggleAICoach } = useUIStore()
  const { context, quickReplies, ageMode } = useCoach()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const displayMessages = messages.length
    ? messages
    : [{ role: 'coach', text: context.message, emotion: context.emotion }]

  const sendMessage = (text) => {
    if (!text.trim()) return
    const reply = getQuickReplyResponse(text, ageMode)
    setMessages((prev) => [
      ...prev,
      { role: 'user', text },
      { role: 'coach', text: reply, emotion: 'happy' },
    ])
    setInput('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm"
    >
      <div className="glass-effect rounded-2xl shadow-premium border border-island-blue/20 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-island-blue/5">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              🤖
            </motion.div>
            <div>
              <h3 className="font-bold text-island-blue">Guide AI</h3>
              <p className="text-xs text-text-secondary flex items-center gap-1">
                {getEmotionEmoji(context.emotion)} Always helping!
              </p>
            </div>
          </div>
          <button
            onClick={toggleAICoach}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
            aria-label="Close coach"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-4 max-h-56 overflow-y-auto space-y-3">
          <AnimatePresence mode="popLayout">
            {displayMessages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-island-blue/20 text-white rounded-br-md'
                      : 'bg-white/5 border border-white/10 text-text-white rounded-bl-md'
                  }`}
                >
                  {msg.role === 'coach' && (
                    <span className="mr-1">{getEmotionEmoji(msg.emotion)}</span>
                  )}
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              onClick={() => sendMessage(reply)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-island-blue/40 hover:bg-island-blue/10 transition-all"
            >
              {reply}
            </button>
          ))}
        </div>

        <div className="p-4 pt-0 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Ask your coach..."
            className="flex-1 glass-effect rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-island-blue/50"
          />
          <button
            onClick={() => sendMessage(input)}
            className="p-2 rounded-xl premium-button-primary"
            aria-label="Send message"
          >
            <MessageCircle size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
