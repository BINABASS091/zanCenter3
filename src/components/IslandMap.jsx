import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'

export default function IslandMap({ buildings = [], onRemoveBuilding, onDropBuilding, onMoveBuilding, onUpgradeBuilding }) {
  const mapRef = useRef(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragOver(false)
    const rawData = event.dataTransfer.getData('application/json')
    if (!rawData || !mapRef.current) return

    const payload = JSON.parse(rawData)
    const bounds = mapRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
    const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))

    onDropBuilding?.(payload, { x, y })
  }

  return (
    <div
      ref={mapRef}
      className={`relative w-full rounded-xl border aspect-video overflow-hidden transition-all duration-300 ${
        isDragOver
          ? 'bg-island-blue bg-opacity-10 border-island-blue ring-2 ring-island-blue/50 shadow-premium'
          : 'bg-white bg-opacity-5 border-island-blue border-opacity-20 hover:border-island-blue/30 shadow-soft'
      }`}
      role="application"
      aria-label="Zanzibar.Center island map canvas"
      tabIndex={0}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
      }}
      onDrop={handleDrop}
      style={{
        backgroundImage:
          'linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%), linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.05) 25%, rgba(0, 212, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.05) 75%, rgba(0, 212, 255, 0.05) 76%, transparent 77%)',
        backgroundSize: '50px 50px',
      }}
    >
      <AnimatePresence>
        {buildings.map((building) => (
          <motion.div
            key={building.id}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            draggable
            onDragStart={(event) => {
              event.dataTransfer.setData('application/json', JSON.stringify({
                type: 'placed',
                buildingId: building.id,
              }))
            }}
            className="absolute cursor-move outline-none"
            tabIndex={0}
            aria-label={`${building.name} building`}
            style={{
              left: `${(building.position?.x ?? 0.2) * 88}%`,
              top: `${(building.position?.y ?? 0.2) * 84}%`,
            }}
          >
            <div className="glass-effect rounded-lg p-3 group hover:shadow-premium transition-all relative">
              {/* Level Indicator Badge */}
              <div className="absolute -top-1.5 -left-1.5 bg-black bg-opacity-70 text-[9px] text-golden-sun px-1 py-0.5 rounded font-extrabold shadow-sm border border-golden-sun/20">
                Lv.{building.level || 1}
              </div>
              <div className="text-4xl mt-1 text-center">{building.icon}</div>
              <p className="text-[10px] font-semibold mt-1 text-island-blue whitespace-nowrap text-center">{building.name}</p>
              
              {/* Overlay Operations on Hover */}
              <div className="absolute -top-2.5 -right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                {onUpgradeBuilding && (
                  <button
                    aria-label={`Upgrade ${building.name}`}
                    className="w-6 h-6 bg-tropical-green text-ocean-deep rounded-full flex items-center justify-center text-xs font-black hover:scale-110 active:scale-95 transition-all shadow-md hover:bg-emerald-400"
                    onClick={() => onUpgradeBuilding(building.id)}
                  >
                    ▲
                  </button>
                )}
                <button
                  aria-label={`Remove ${building.name}`}
                  className="w-6 h-6 bg-coral-alert text-white rounded-full flex items-center justify-center text-xs font-bold hover:scale-110 active:scale-95 transition-all shadow-md hover:bg-red-400"
                  onClick={() => onRemoveBuilding && onRemoveBuilding(building.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {buildings.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-center opacity-50">
          <div>
            <div className="text-6xl mb-4">🏝️</div>
            <p className="text-text-secondary">Place your first building!</p>
          </div>
        </div>
      )}
    </div>
  )
}