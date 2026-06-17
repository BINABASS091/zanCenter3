import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import { ZANZIBAR_COURSES, EVENING_ACTIVITIES, CAMP_PRICING, SAFETY_FEATURES, REGISTRATION_DEADLINES, EXAMPLE_TIMETABLE } from '../data/campCourses'
import { useGameStore } from '../store/gameStore'
import { useAgeMode } from '../hooks/useAgeMode'
import { Calendar, MapPin, Users, Shield, Clock, Euro, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

const SUBJECT_COLORS = {
  stem: 'from-island-blue/20 to-tropical-green/10 border-island-blue/30',
  science: 'from-tropical-green/20 to-golden-sun/10 border-tropical-green/30',
  arts: 'from-golden-sun/20 to-coral-alert/10 border-golden-sun/30',
  crafts: 'from-coral-alert/20 to-island-blue/10 border-coral-alert/30',
  music: 'from-island-blue/20 to-golden-sun/10 border-island-blue/30',
  sports: 'from-tropical-green/20 to-coral-alert/10 border-tropical-green/30',
}

const SUBJECT_ICONS = {
  stem: '🔬',
  science: '🧪',
  arts: '🎨',
  crafts: '🛠️',
  music: '🎵',
  sports: '⚽',
}

export default function CampInfoPage() {
  const { level } = useGameStore()
  const { mode } = useAgeMode()
  const [expandedCourse, setExpandedCourse] = useState(null)
  const [showTimetable, setShowTimetable] = useState(false)
  const [pricingView, setPricingView] = useState('earlyBird')

  const toggleCourse = (id) => {
    setExpandedCourse(expandedCourse === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Logo */}
          <motion.div
            className="mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src="/zanzibar.Camp_logo-Photoroom.png" alt="Zanzibar.Camp School Camps" className="h-32 md:h-40 w-auto object-contain" />
          </motion.div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-golden-sun border-opacity-40 mb-4">
            <span className="text-xl">🌴</span>
            <span className="text-xs font-bold uppercase tracking-widest text-golden-sun">Zanzibar Children Camps</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-island-blue via-tropical-green to-golden-sun bg-clip-text text-transparent">
              Learning Village Bwejuu
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-text-secondary mb-6">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-tropical-green" />
              <span>Bwejuu, Zanzibar</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-island-blue" />
              <span>Ages 5-15</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-golden-sun" />
              <span>Monday - Friday</span>
            </div>
          </div>

          <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
            Join us for an unforgettable learning experience on the beautiful island of Zanzibar. Our children's camps combine education, adventure, and fun in a safe, nurturing environment.
          </p>
        </motion.div>

        {/* How Camps Work */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">📋</span>
            How Our Camps Work
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: 'Choose Your Courses', desc: 'Select from our diverse range of courses covering technology, arts, science, and sports.', icon: '📚' },
              { step: 2, title: 'Learn & Create', desc: 'Expert instructors guide you through hands-on projects and exciting activities.', icon: '🎨' },
              { step: 3, title: 'Play & Explore', desc: 'Evening activities, beach time, and outdoor adventures complete each day.', icon: '🏄' },
            ].map((item) => (
              <div key={item.step} className="premium-card rounded-2xl p-6 text-center hover:shadow-premium transition-all">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-island-blue/20 to-tropical-green/10 flex items-center justify-center text-3xl mb-4 border border-white/10">
                  {item.icon}
                </div>
                <div className="text-xs text-island-blue font-bold mb-2">Step {item.step}</div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Example Timetable */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <button
            onClick={() => setShowTimetable(!showTimetable)}
            className="w-full flex items-center justify-between premium-card rounded-2xl p-5 hover:shadow-premium transition-all"
          >
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-island-blue" />
              <h2 className="text-xl font-bold">Example Daily Timetable</h2>
            </div>
            {showTimetable ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>

          <AnimatePresence>
            {showTimetable && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {[
                    { label: 'Morning', periods: EXAMPLE_TIMETABLE.morning, accent: 'from-golden-sun/20' },
                    { label: 'Afternoon', periods: EXAMPLE_TIMETABLE.afternoon, accent: 'from-tropical-green/20' },
                    { label: 'Evening', periods: EXAMPLE_TIMETABLE.evening, accent: 'from-island-blue/20' },
                  ].map((block) => (
                    <div key={block.label} className={`premium-card rounded-xl p-4 bg-gradient-to-br ${block.accent}`}>
                      <h3 className="font-bold text-sm mb-3 text-island-blue">{block.label}</h3>
                      <div className="space-y-2">
                        {block.periods.map((period) => (
                          <div key={period.time} className="flex items-start gap-3 text-sm">
                            <span className="text-text-secondary font-mono text-xs w-12 shrink-0">{period.time}</span>
                            <span className="text-white">{period.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* Courses at Camp */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            Courses at Camp
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ZANZIBAR_COURSES.map((course, index) => {
              const isExpanded = expandedCourse === course.id
              const colorClass = SUBJECT_COLORS[course.subject] || SUBJECT_COLORS.stem

              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`premium-card rounded-2xl overflow-hidden border ${colorClass} transition-all duration-300 hover:shadow-premium`}
                >
                  <button
                    onClick={() => toggleCourse(course.id)}
                    className="w-full text-left p-5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl border border-white/10">
                          {course.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-base">{course.title}</h3>
                          <p className="text-xs text-text-secondary">{course.partner}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        course.difficulty === 'beginner' ? 'bg-tropical-green/20 text-tropical-green' :
                        course.difficulty === 'intermediate' ? 'bg-golden-sun/20 text-golden-sun' :
                        'bg-coral-alert/20 text-coral-alert'
                      }`}>
                        {course.difficulty}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">{course.description}</p>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="text-text-secondary">Ages {course.ageRange}</span>
                        <span className="flex items-center gap-1 text-golden-sun">
                          <span>+{course.xpReward} XP</span>
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10 px-5 overflow-hidden"
                      >
                        <div className="py-4 space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-text-secondary">Instructor:</span>
                            <span className="font-semibold">{course.instructor || 'TBD'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-text-secondary">Duration:</span>
                            <span>{course.timeEstimate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-text-secondary">Schedule:</span>
                            <span>{course.schedule?.join(', ')}</span>
                          </div>
                          {course.requirements && (
                            <div className="flex items-start gap-2">
                              <span className="text-text-secondary">Prerequisites:</span>
                              <span>{course.requirements.join(', ')}</span>
                            </div>
                          )}
                          <button className="w-full premium-button-primary text-sm mt-2 flex items-center justify-center gap-2">
                            <span>Register Now</span>
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Evening Activities */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
            <span className="text-3xl">🌙</span>
            Evening Activities at Camp
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {EVENING_ACTIVITIES.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="premium-card rounded-xl p-4 text-center hover:shadow-premium transition-all group cursor-pointer"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{activity.icon}</div>
                <h3 className="font-bold text-xs">{activity.title}</h3>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Safety Features */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Shield size={28} className="text-tropical-green" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Because Safety Matters</h2>
              <p className="text-text-secondary">Your child's wellbeing is our top priority</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAFETY_FEATURES.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-effect rounded-xl p-5 flex items-start gap-4 hover:bg-white/10 transition-all"
              >
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-text-secondary">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Camp Tuition */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Euro size={28} className="text-golden-sun" />
            <h2 className="text-2xl md:text-3xl font-bold">Camp Tuition</h2>
          </div>

          {/* Pricing Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setPricingView('earlyBird')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                pricingView === 'earlyBird'
                  ? 'bg-gradient-to-r from-tropical-green to-island-blue text-ocean-deep shadow-md'
                  : 'glass-effect text-text-secondary hover:text-white'
              }`}
            >
              Early Bird Pricing
            </button>
            <button
              onClick={() => setPricingView('normal')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                pricingView === 'normal'
                  ? 'bg-gradient-to-r from-golden-sun to-coral-alert text-ocean-deep shadow-md'
                  : 'glass-effect text-text-secondary hover:text-white'
              }`}
            >
              Normal Pricing
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full glass-effect rounded-2xl overflow-hidden">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Weeks</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Price / Week</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Total</th>
                </tr>
              </thead>
              <tbody>
                {CAMP_PRICING[pricingView].map((row, index) => (
                  <tr key={row.weeks} className={index % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                    <td className="px-6 py-4">
                      <span className="font-bold">{row.weeks} week{row.weeks > 1 ? 's' : ''}</span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {row.pricePerWeek} per week
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-tropical-green">{row.total} total</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sibling Discount */}
          <div className="mt-6 premium-card rounded-xl p-5">
            <h3 className="font-bold mb-4">Sibling Discounts</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {CAMP_PRICING.siblingDiscount.map((discount) => (
                <div key={discount.siblings} className="glass-effect rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm text-text-secondary">{discount.siblings} siblings</span>
                  <span className="font-bold text-golden-sun">{discount.discount} off</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Registration Deadlines */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={28} className="text-island-blue" />
            <h2 className="text-2xl md:text-3xl font-bold">Important Dates</h2>
          </div>

          <div className="premium-card rounded-2xl overflow-hidden">
            <div className="divide-y divide-white/10">
              {REGISTRATION_DEADLINES.map((deadline) => (
                <div key={deadline.step} className="flex items-start gap-4 p-4 hover:bg-white/5 transition-all">
                  <div className="w-8 h-8 rounded-full bg-island-blue/20 flex items-center justify-center text-sm font-bold text-island-blue shrink-0">
                    {deadline.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{deadline.description}</p>
                    {deadline.link ? (
                      <a
                        href={deadline.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-island-blue hover:underline flex items-center gap-1"
                      >
                        {deadline.date} <ExternalLink size={12} />
                      </a>
                    ) : (
                      <p className="text-xs text-text-secondary">{deadline.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-island-blue/20 via-tropical-green/10 to-golden-sun/20 blur-3xl" />
          <div className="relative premium-card rounded-3xl p-8 md:p-12 text-center">
            <div className="text-5xl mb-4">🌴</div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready for an Unforgettable Experience?</h2>
            <p className="text-text-secondary mb-6 max-w-xl mx-auto">
              Join us at Learning Village Bwejuu for a week (or more!) of learning, adventure, and memories that will last a lifetime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://calendar.zanzibar.center"
                target="_blank"
                rel="noopener noreferrer"
                className="premium-button-primary inline-flex items-center justify-center gap-2 px-8 py-4"
              >
                View Calendar & Register
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  )
}
