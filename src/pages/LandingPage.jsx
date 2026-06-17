import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Sparkles, Play, X, Menu, ChevronDown, Users, BookOpen, Clock, CircleCheck as CheckCircle2 } from 'lucide-react'

const STATS = [
  { label: 'Kids Playing', value: 80, suffix: 'K+', icon: Users },
  { label: 'Mini-Games', value: 12, suffix: '+', icon: BookOpen },
  { label: 'Countries', value: 45, suffix: '+', icon: Clock },
]

const FEATURES = [
  {
    icon: '🎮',
    title: 'Game Hub',
    description: 'Play Quiz Arena, Tap Quest & more — Roblox meets Kahoot for kids worldwide.',
    link: '/hub',
    accent: 'from-golden-sun/20 to-coral-alert/10',
  },
  {
    icon: '🏗️',
    title: 'Build Your Island',
    description: 'Drag & drop buildings Minecraft-style — manage energy, food & happiness.',
    link: '/island',
    accent: 'from-island-blue/20 to-tropical-green/10',
  },
  {
    icon: '⚛️',
    title: 'React Web Course',
    description: 'The only learning path: build real websites & your portfolio with React.',
    link: '/react-course',
    accent: 'from-tropical-green/20 to-island-blue/10',
  },
  {
    icon: '🗺️',
    title: 'Explore Zones',
    description: 'Discover hidden island regions — Pokémon GO meets Animal Crossing.',
    link: '/explore',
    accent: 'from-island-blue/20 to-golden-sun/10',
  },
  {
    icon: '🤖',
    title: 'Island Guide AI',
    description: 'Your friendly companion for gameplay tips, missions & React help.',
    link: '/dashboard',
    accent: 'from-island-blue/20 to-coral-alert/10',
  },
  {
    icon: '📂',
    title: 'Portfolio Showcase',
    description: 'Publish the websites you build — share your work with the world.',
    link: '/portfolio',
    accent: 'from-tropical-green/20 to-island-blue/10',
  },
]

const PHASES = [
  { phase: '1', title: 'Play & Explore', desc: 'Enter the Game Hub and discover island zones', icon: '🎮', link: '/hub' },
  { phase: '2', title: 'Build Your World', desc: 'Create your island — Minecraft creative mode fun', icon: '🏗️', link: '/island' },
  { phase: '3', title: 'Learn React', desc: 'Build real websites step by step', icon: '⚛️', link: '/react-course' },
  { phase: '4', title: 'Publish Portfolio', desc: 'Launch your personal developer portfolio', icon: '🌍', link: '/portfolio' },
]

const DEMO_SLIDES = [
  { emoji: '🎮', title: 'Game Hub', desc: 'Mini-games, events & global leaderboards' },
  { emoji: '⚛️', title: 'React Course', desc: 'Build websites & portfolios from scratch' },
  { emoji: '🏝️', title: 'Island Builder', desc: 'Creative world simulation for all ages' },
]

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Path', href: '#path' },
  { label: 'Demo', href: '#demo' },
  { label: 'Village', href: '/camp' },
  { label: 'Calendar', href: 'https://calendar.zanzibar.center', external: true },
]

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

function FloatingEmoji({ emoji, className, animate, delay = 0, duration = 6 }) {
  return (
    <motion.span
      role="img"
      aria-hidden="true"
      className={`select-none pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, ...animate }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        ...(animate?.y || animate?.rotate
          ? { y: { duration, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: duration * 2, repeat: Infinity, ease: 'easeInOut' } }
          : {}),
      }}
    >
      {emoji}
    </motion.span>
  )
}

function LandingNav({ scrolled }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'landing-nav-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.2 }}
          >
            <img src="/zanzibar.Camp_logo-Photoroom.png" alt="Zanzibar.Camp" className="h-20 w-auto object-contain" />
          </motion.div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-island-blue transition-colors font-medium"
              >
                {link.label}
              </a>
            ) : link.href.startsWith('#') ? (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-text-secondary hover:text-island-blue transition-colors font-medium"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-text-secondary hover:text-island-blue transition-colors font-medium"
              >
                {link.label}
              </Link>
            )
          ))}
          <Link
            to="/hub"
            className="premium-button-primary text-sm px-5 py-2.5 inline-flex items-center gap-2"
          >
            Start Playing
            <ArrowRight size={16} />
          </Link>
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-ocean-deep/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="text-left py-2 text-text-secondary hover:text-island-blue transition-colors"
                  >
                    {link.label}
                  </a>
                ) : link.href.startsWith('#') ? (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left py-2 text-text-secondary hover:text-island-blue transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-left py-2 text-text-secondary hover:text-island-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Link
                to="/hub"
                className="premium-button-primary text-center mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Start Playing
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function FeatureCard({ feature, index, onNavigate }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }, [])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onClick={() => onNavigate(feature.link)}
      className="landing-feature-card group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10">
        <motion.div
          className="text-4xl md:text-5xl mb-4 inline-block"
          whileHover={{ scale: 1.2, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {feature.icon}
        </motion.div>
        <h3 className="text-lg md:text-xl font-bold mb-2 group-hover:text-island-blue transition-colors">
          {feature.title}
        </h3>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">{feature.description}</p>
        <span className="inline-flex items-center gap-1 mt-4 text-island-blue text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          Explore <ArrowRight size={14} />
        </span>
      </div>
    </motion.div>
  )
}

function PhaseCard({ step, index, isActive, onHover, onNavigate }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      onMouseEnter={() => onHover(index)}
      onClick={() => onNavigate(step.link)}
      className={`relative flex items-start gap-4 md:gap-6 p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-400 ${
        isActive
          ? 'glass-effect border-island-blue/40 shadow-premium scale-[1.02]'
          : 'hover:bg-white/5'
      }`}
    >
      {index < PHASES.length - 1 && (
        <div className="hidden md:block absolute left-[2.65rem] top-[4.5rem] w-0.5 h-[calc(100%+0.5rem)] bg-gradient-to-b from-island-blue/50 to-transparent" />
      )}

      <motion.div
        className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isActive ? 'bg-gradient-to-br from-island-blue to-tropical-green shadow-premium' : 'glass-effect'
        }`}
        animate={isActive ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-2xl md:text-3xl">{step.icon}</span>
      </motion.div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            isActive ? 'bg-island-blue/20 text-island-blue' : 'bg-white/10 text-text-secondary'
          }`}>
            Phase {step.phase}
          </span>
          {isActive && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-tropical-green"
            >
              <CheckCircle2 size={16} />
            </motion.span>
          )}
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-1">{step.title}</h3>
        <p className="text-text-secondary text-sm md:text-base">{step.desc}</p>
      </div>

      <ArrowRight
        size={20}
        className={`flex-shrink-0 mt-4 transition-all duration-300 ${
          isActive ? 'text-island-blue translate-x-1' : 'text-text-secondary/40 opacity-0 md:opacity-100'
        }`}
      />
    </motion.div>
  )
}

function DemoModal({ open, onClose, onStart }) {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    if (!open) return
    const timer = setInterval(() => setSlide((s) => (s + 1) % DEMO_SLIDES.length), 3000)
    return () => clearInterval(timer)
  }, [open])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ocean-deep/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="landing-gradient-border w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="landing-gradient-border-inner p-6 md:p-10 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Close demo"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8">
                <p className="text-island-blue text-sm font-semibold mb-2">Product Demo</p>
                <h3 className="text-2xl md:text-3xl font-bold">See the Experience Hub in Action</h3>
              </div>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-ocean-surface to-ocean-deep border border-white/10 mb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8"
                  >
                    <motion.span
                      className="text-7xl md:text-8xl mb-4"
                      animate={{ y: [0, -12, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {DEMO_SLIDES[slide].emoji}
                    </motion.span>
                    <h4 className="text-xl md:text-2xl font-bold mb-2">{DEMO_SLIDES[slide].title}</h4>
                    <p className="text-text-secondary text-center">{DEMO_SLIDES[slide].desc}</p>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {DEMO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === slide ? 'bg-island-blue w-6' : 'bg-white/30'
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button onClick={onStart} className="premium-button-primary flex items-center justify-center gap-2">
                  Start Your Adventure <ArrowRight size={18} />
                </button>
                <button onClick={onClose} className="premium-button-secondary">
                  Keep Exploring
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [demoOpen, setDemoOpen] = useState(false)
  const [activePhase, setActivePhase] = useState(0)
  const heroRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white overflow-x-hidden">
      <LandingNav scrolled={scrolled} />
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} onStart={() => navigate('/hub')} />

      {/* Hero */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center px-4 md:px-8 pt-28 pb-16 md:pt-0 overflow-hidden"
      >
        {/* Ambient orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="landing-orb w-72 h-72 md:w-96 md:h-96 bg-island-blue/20 top-10 -left-20 animate-orb-drift" />
          <div className="landing-orb w-64 h-64 md:w-80 md:h-80 bg-tropical-green/15 bottom-20 -right-16 animate-orb-drift" style={{ animationDelay: '4s' }} />
          <div className="landing-orb w-48 h-48 bg-golden-sun/10 top-1/2 left-1/2 -translate-x-1/2 animate-orb-drift" style={{ animationDelay: '2s' }} />
        </div>

        {/* Floating emojis */}
        <FloatingEmoji
          emoji="🌊"
          className="absolute top-24 left-[5%] md:left-[10%] text-5xl md:text-8xl opacity-20 md:opacity-30"
          animate={{ y: [0, -25, 0] }}
          delay={0.2}
        />
        <FloatingEmoji
          emoji="☁️"
          className="absolute bottom-32 right-[5%] md:right-[12%] text-5xl md:text-8xl opacity-20 md:opacity-30"
          animate={{ y: [0, 20, 0] }}
          delay={0.4}
        />
        <FloatingEmoji
          emoji="🏝️"
          className="absolute top-1/3 right-[8%] md:right-[20%] text-4xl md:text-7xl opacity-10 md:opacity-20"
          animate={{ rotate: [0, 8, -8, 0], y: [0, -15, 0] }}
          delay={0.6}
        />

        <motion.div style={{ y: heroY }} className="max-w-5xl mx-auto text-center z-10 w-full">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="mb-6 md:mb-8"
          >
            <motion.div
              className="flex justify-center mb-6 md:mb-8"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <img src="/zanzibar.Camp_logo-Photoroom.png" alt="Zanzibar.Camp" className="h-32 md:h-40 w-auto object-contain" />
            </motion.div>

            <motion.div
              className="inline-block mb-4 md:mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-island-blue/40 shadow-soft">
                <Sparkles size={16} className="text-tropical-green animate-pulse" />
                <span className="text-xs md:text-sm font-semibold tracking-wide">Global Kids Experience Hub</span>
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight">
              <span className="text-shine">Experience Hub</span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-text-secondary mb-2 md:mb-4 leading-relaxed max-w-3xl mx-auto px-2">
              Play games, build islands, and learn React to create websites & portfolios.
            </p>
            <p className="text-sm sm:text-base md:text-xl text-tropical-green font-semibold">
              A game universe for kids aged 5–16 worldwide 🌍
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-10 md:mb-14 px-2"
          >
            <Link
              to="/hub"
              className="premium-button-primary text-base md:text-lg group inline-flex items-center justify-center gap-2 px-8 py-4"
            >
              Start Playing
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="premium-button-secondary text-base md:text-lg inline-flex items-center justify-center gap-2 px-8 py-4 group"
            >
              <Play size={18} className="group-hover:scale-110 transition-transform" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto px-2"
          >
            {STATS.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  className="landing-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <Icon size={18} className="mx-auto mb-2 text-island-blue/70" />
                  <p className="text-text-secondary text-xs md:text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-island-blue">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-12 md:mt-16 flex flex-col items-center gap-1 text-text-secondary/60 hover:text-island-blue transition-colors mx-auto"
            aria-label="Scroll to features"
          >
            <span className="text-xs tracking-widest uppercase">Discover more</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown size={24} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Features */}
      <section id="features" className="py-16 md:py-28 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-island-blue text-sm font-semibold tracking-widest uppercase mb-3">Platform</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-island-blue to-tropical-green bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} onNavigate={navigate} />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="path" className="py-16 md:py-28 px-4 md:px-8 bg-white/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-island-blue/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-tropical-green text-sm font-semibold tracking-widest uppercase mb-3">Journey</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Your Learning Path</h2>
          </motion.div>

          <div className="space-y-3 md:space-y-4">
            {PHASES.map((step, i) => (
              <PhaseCard
                key={step.phase}
                step={step}
                index={i}
                isActive={activePhase === i}
                onHover={setActivePhase}
                onNavigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Demo preview strip */}
      <section id="demo" className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="landing-gradient-border"
          >
            <div className="landing-gradient-border-inner p-6 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <p className="text-golden-sun text-sm font-semibold tracking-widest uppercase mb-3">Live Preview</p>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4">Experience the Adventure</h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    Watch how students build islands, complete missions, and master programming — all in one immersive platform.
                  </p>
                  <button
                    onClick={() => setDemoOpen(true)}
                    className="premium-button-primary inline-flex items-center gap-2 group"
                  >
                    <Play size={18} className="group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {DEMO_SLIDES.map((slide, i) => (
                    <motion.button
                      key={slide.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -4, scale: 1.05 }}
                      onClick={() => { setDemoOpen(true) }}
                      className="glass-effect rounded-xl p-3 md:p-4 text-center hover:border-island-blue/40 transition-all"
                    >
                      <span className="text-2xl md:text-3xl block mb-2">{slide.emoji}</span>
                      <span className="text-[10px] md:text-xs text-text-secondary leading-tight">{slide.title}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-28 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-island-blue/20 via-tropical-green/20 to-golden-sun/20 rounded-3xl blur-2xl" />
            <div className="relative glass-effect rounded-3xl p-8 md:p-14 border border-white/10">
              <motion.div
                className="text-5xl md:text-6xl mb-4"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🏝️
              </motion.div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
                Ready to Enter the Experience Hub?
              </h2>
              <p className="text-base md:text-xl text-text-secondary mb-6 md:mb-8 max-w-xl mx-auto">
                Join kids worldwide — play, build, explore, and learn React to make real websites.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/dashboard"
                  className="premium-button-primary text-base md:text-lg inline-flex items-center justify-center gap-2 group px-8 py-4"
                >
                  Get Started Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={scrollToDemo}
                  className="premium-button-secondary text-base md:text-lg px-8 py-4"
                >
                  See Demo First
                </button>
              </div>
            </div>
          </motion.div>

          <footer className="mt-12 md:mt-16 pt-8 border-t border-white/10 text-text-secondary text-sm">
            <div className="flex flex-col gap-6">
              {/* External Links Row */}
              <div className="flex flex-wrap justify-center gap-4 text-xs">
                <a href="https://calendar.zanzibar.center" target="_blank" rel="noopener noreferrer" className="hover:text-island-blue transition-colors">
                  📅 Calendar
                </a>
                <a href="https://zanzibar.camp" target="_blank" rel="noopener noreferrer" className="hover:text-island-blue transition-colors">
                  🏕️ Children's Camps
                </a>
                <a href="https://zanzibar.center" target="_blank" rel="noopener noreferrer" className="hover:text-island-blue transition-colors">
                  🏫 Learning Village
                </a>
                <a href="https://zanzibar.center/courses-for-adults" target="_blank" rel="noopener noreferrer" className="hover:text-island-blue transition-colors">
                  👨‍🎓 Adult Courses
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to="/" className="flex items-center">
                  <img src="/zanzibar.Camp_logo-Photoroom.png" alt="Zanzibar.Camp" className="h-16 w-auto object-contain" />
                </Link>
                <p className="text-center">© {new Date().getFullYear()} Zanzibar.Center Experience Hub — play, build & learn React worldwide.</p>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  )
}
