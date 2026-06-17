import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, RefreshCw, Terminal, Award, BookOpen, CircleAlert as AlertCircle } from 'lucide-react'
import { useGameStore, useUIStore } from '../store/gameStore'

export default function InteractiveLesson({ isOpen, onClose }) {
  const { addXP, addGold } = useGameStore()
  const { addNotification } = useUIStore()

  const [code, setCode] = useState(
`// Mission: Plant 3 farms to feed your citizens!
// Use a for loop that runs 3 times and calls plantFarm()

for (let i = 0; i < 3; i++) {
  plantFarm();
}`
  )

  const [consoleLogs, setConsoleLogs] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleReset = () => {
    setCode(
`// Mission: Plant 3 farms to feed your citizens!
// Use a for loop that runs 3 times and calls plantFarm()

for (let i = 0; i < 3; i++) {
  plantFarm();
}`
    )
    setConsoleLogs([])
    setIsSuccess(false)
    setErrorMsg('')
  }

  const runCode = () => {
    setIsRunning(true)
    setErrorMsg('')
    setConsoleLogs(['> Initializing JavaScript runtime...', '> Running script...'])

    setTimeout(() => {
      // Basic validation of the user's input
      const codeClean = code.replace(/\s+/g, '')
      
      // Let's check for loop structure and the plantFarm call
      const hasForLoop = /for\(let\w+=0;\w+<3;\w+\+\+\)/.test(codeClean) || /for\(var\w+=0;\w+<3;\w+\+\+\)/.test(codeClean)
      const hasPlantFarm = codeClean.includes('plantFarm()')
      
      if (!hasForLoop) {
        setConsoleLogs(prev => [
          ...prev,
          '> Error: Missing or incorrect "for" loop structure.',
          '> Hint: Use "for (let i = 0; i < 3; i++) {"'
        ])
        setErrorMsg('Loop structure is incorrect. Make sure it runs exactly 3 times (i < 3).')
        setIsRunning(false)
        return
      }

      if (!hasPlantFarm) {
        setConsoleLogs(prev => [
          ...prev,
          '> Error: Function "plantFarm()" was never called.',
          '> Hint: Call "plantFarm();" inside your loop.'
        ])
        setErrorMsg('The plantFarm() command was not found inside the loop.')
        setIsRunning(false)
        return
      }

      // Successful execution simulation
      let currentLogs = []
      for (let i = 1; i <= 3; i++) {
        currentLogs.push(`> [Step ${i}] Calling plantFarm()...`)
        currentLogs.push(`> [System] Farm #${i} successfully planted! 🌾`)
      }

      setConsoleLogs(prev => [...prev, ...currentLogs, '> Code execution completed successfully.'])
      setIsSuccess(true)
      setIsRunning(false)

      // Award XP and Gold!
      addXP(250)
      addGold(200)
      addNotification({
        type: 'success',
        title: 'Challenge Solved!',
        message: 'You earned 250 XP and 200 Gold! Keep it up!'
      })
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] bg-ocean-surface border border-island-blue border-opacity-30 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white border-opacity-10 bg-ocean-deep bg-opacity-50">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💻</span>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-island-blue to-tropical-green bg-clip-text text-transparent">
                  JavaScript Playground: Loops
                </h2>
                <p className="text-xs text-text-secondary">Lesson 2.1 • Zanzibar.Center Code Academy</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-all text-text-secondary hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main Layout */}
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Panel: Instructions */}
            <div className="w-full md:w-5/12 p-6 border-r border-white border-opacity-10 overflow-y-auto flex flex-col gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold flex items-center gap-2 text-island-blue">
                  <BookOpen size={20} />
                  The For Loop
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  In programming, you often want to repeat an action. Instead of writing the same code over and over, we use a <span className="text-tropical-green font-semibold">loop</span>!
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  A basic JavaScript <code className="bg-white bg-opacity-10 px-1.5 py-0.5 rounded text-island-blue">for</code> loop looks like this:
                </p>
                <pre className="bg-ocean-deep bg-opacity-65 p-3 rounded-lg text-xs text-tropical-green font-mono border border-white border-opacity-5">
{`for (let i = 0; i < 3; i++) {
  // code to repeat goes here
}`}
                </pre>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-golden-sun">Instructions:</h4>
                <ul className="text-sm text-text-secondary list-disc pl-5 space-y-2">
                  <li>
                    Examine the template code on the right.
                  </li>
                  <li>
                    The loop begins with <code className="text-island-blue bg-white bg-opacity-5 px-1 py-0.5 rounded">let i = 0</code>, runs as long as <code className="text-island-blue bg-white bg-opacity-5 px-1 py-0.5 rounded">i &lt; 3</code>, and increases by 1 each step (<code className="text-island-blue bg-white bg-opacity-5 px-1 py-0.5 rounded">i++</code>).
                  </li>
                  <li>
                    Inside the curly brackets, write <code className="text-tropical-green bg-white bg-opacity-5 px-1 py-0.5 rounded">plantFarm();</code>.
                  </li>
                  <li>
                    Click <span className="text-island-blue font-semibold">Run Code</span> to test your script.
                  </li>
                </ul>
              </div>

              {errorMsg && (
                <div className="bg-coral-alert bg-opacity-10 border border-coral-alert border-opacity-35 rounded-xl p-4 flex gap-3 text-sm text-coral-alert mt-auto">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <div>
                    <span className="font-bold">Check your code:</span>
                    <p className="text-xs text-text-secondary mt-1">{errorMsg}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel: Editor & Console */}
            <div className="flex-1 flex flex-col overflow-hidden bg-ocean-deep bg-opacity-40">
              {/* Editor Pane */}
              <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center justify-between mb-2 text-xs text-text-secondary uppercase tracking-wider font-semibold">
                  <span>code_editor.js</span>
                  <span className="text-island-blue">JavaScript</span>
                </div>
                <div className="flex-1 relative border border-white border-opacity-10 rounded-xl overflow-hidden bg-ocean-deep flex">
                  {/* Line Numbers */}
                  <div className="w-12 bg-white bg-opacity-5 border-r border-white border-opacity-5 flex flex-col items-center py-4 font-mono text-xs text-text-secondary select-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <span key={n} className="h-6 flex items-center justify-center">{n}</span>
                    ))}
                  </div>
                  {/* Textarea */}
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    disabled={isRunning || isSuccess}
                    className="flex-1 bg-transparent resize-none p-4 font-mono text-sm text-white focus:outline-none leading-6 caret-island-blue"
                    spellCheck="false"
                  />
                </div>
              </div>

              {/* Console Pane */}
              <div className="h-56 border-t border-white border-opacity-10 bg-ocean-deep flex flex-col overflow-hidden">
                <div className="flex items-center justify-between px-6 py-3 border-b border-white border-opacity-5 text-xs text-text-secondary font-semibold font-mono">
                  <span className="flex items-center gap-1.5"><Terminal size={14} /> live_console</span>
                  <span className="text-tropical-green">Connected</span>
                </div>
                <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 bg-black bg-opacity-25 select-text">
                  {consoleLogs.length === 0 ? (
                    <span className="text-text-secondary opacity-40">Console output will appear here after running your script.</span>
                  ) : (
                    consoleLogs.map((log, index) => (
                      <div
                        key={index}
                        className={
                          log.startsWith('> Error') ? 'text-coral-alert' :
                          log.startsWith('> [System]') || log.startsWith('> Success') ? 'text-tropical-green' :
                          'text-text-secondary'
                        }
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-6 border-t border-white border-opacity-10 bg-ocean-deep bg-opacity-50 flex justify-between items-center">
            <div className="text-xs text-text-secondary flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-golden-sun"><Award size={14} /> Rewards: 250 XP</span>
              <span className="flex items-center gap-1.5 text-island-blue">💰 200 Gold</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="premium-button-secondary text-sm flex items-center gap-2 px-5 py-2.5"
              >
                <RefreshCw size={16} />
                Reset Code
              </button>
              {isSuccess ? (
                <button
                  onClick={onClose}
                  className="premium-button-primary text-sm flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-tropical-green to-island-blue"
                >
                  Close & View Island Map
                </button>
              ) : (
                <button
                  onClick={runCode}
                  disabled={isRunning}
                  className="premium-button-primary text-sm flex items-center gap-2 px-6 py-2.5"
                >
                  <Play size={16} className={isRunning ? 'animate-spin' : ''} />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
