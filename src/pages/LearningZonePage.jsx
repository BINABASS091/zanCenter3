import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopNavigation from '../components/TopNavigation'
import InteractiveLesson from '../components/InteractiveLesson'
import { useGameStore } from '../store/gameStore'
import { BookOpen, Award, CheckCircle, Lock, Volume2, VolumeX, Sparkles, Flame, GraduationCap, Compass, Brain, Calculator, Code2, Target, TrendingUp, Clock, Star, Zap, PlayCircle, PauseCircle, RotateCcw, Trophy, Lightbulb } from 'lucide-react'

const locales = {
  en: {
    title: "Learning Zone",
    subtitle: "Explore interactive courses and master new concepts!",
    enrolled: "Courses Enrolled",
    completed: "Lessons Completed",
    streak: "Learning Streak",
    level: "Current Level",
    yourCourses: "Your Learning Path",
    continue: "Continue Learning",
    locked: "Locked",
    requiresLevel: "Requires Level",
    todaysLesson: "Today's Quest",
    startLesson: "Start Lesson →",
    estTime: "Estimated time: 15 minutes",
    achievements: "Collectible Badges",
    listen: "🔊 Listen",
    stop: "⏹ Stop",
    unlockedBtn: "Start Quest",
    lockedBtn: "Locked (Lv. {lvl})",
    subjects: {
      coding: "Coding",
      math: "Mathematics",
      ml: "Machine Learning"
    },
    difficulty: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced"
    },
    exerciseTypes: {
      visual: "Visual Blocks",
      interactive: "Interactive",
      quiz: "Quiz",
      project: "Project"
    },
    courses: [
      { id: 1, title: 'Visual Programming with Blocks', desc: 'Learn coding logic with colorful blocks like Scratch!', difficulty: 'beginner', icon: '�', progress: 75, lessons: 12, completed: 9, subject: 'coding', exerciseType: 'visual', xpReward: 150, timeEstimate: '10 min' },
      { id: 2, title: 'Machine Learning for Kids', desc: 'Teach computers to recognize patterns and make predictions.', difficulty: 'intermediate', icon: '🤖', progress: 45, lessons: 8, completed: 4, subject: 'ml', exerciseType: 'interactive', xpReward: 200, timeEstimate: '15 min' },
      { id: 3, title: 'Math Adventures', desc: 'Solve fun math puzzles and build number sense.', difficulty: 'beginner', icon: '🔢', progress: 60, lessons: 15, completed: 9, subject: 'math', exerciseType: 'interactive', xpReward: 100, timeEstimate: '8 min' },
      { id: 4, title: 'Pattern Recognition', desc: 'Train AI models to recognize images and sounds.', difficulty: 'advanced', icon: '👁️', progress: 20, lessons: 6, completed: 1, subject: 'ml', exerciseType: 'project', xpReward: 300, timeEstimate: '20 min' },
      { id: 5, title: 'JavaScript Fundamentals', desc: 'Write real code and build interactive websites.', difficulty: 'intermediate', icon: '💻', progress: 35, lessons: 10, completed: 3, subject: 'coding', exerciseType: 'interactive', xpReward: 180, timeEstimate: '12 min' },
      { id: 6, title: 'Geometry & Shapes', desc: 'Explore 2D and 3D shapes through interactive exercises.', difficulty: 'beginner', icon: '📐', progress: 80, lessons: 8, completed: 6, subject: 'math', exerciseType: 'visual', xpReward: 120, timeEstimate: '10 min' },
    ],
    todayTitle: "Build Your First AI Model",
    todayDesc: "Create a simple machine learning model that can classify different types of animals! You'll train it with examples and watch it learn - just like real data scientists do.",
    achList: [
      { title: 'Code Master', desc: 'Complete 10 coding lessons', icon: '�', rarity: 'common' },
      { title: 'Math Wizard', desc: 'Solve 50 math problems', icon: '🔢', rarity: 'rare' },
      { title: 'ML Pioneer', desc: 'Build your first AI model', icon: '🤖', rarity: 'epic' },
      { title: 'Perfect Score', desc: 'Get 100% on any quiz', icon: '⭐', rarity: 'legendary' },
    ]
  },
  sw: {
    title: "Eneo la Kujifunzia",
    subtitle: "Gundua kozi shirikishi na bobea katika mambo mapya!",
    enrolled: "Kozi Zilizosajiliwa",
    completed: "Masomo Yaliyokamilika",
    streak: "Mfululizo wa Siku",
    level: "Ngazi ya Sasa",
    yourCourses: "Njia Yako ya Masomo",
    continue: "Endelea Kujifunza",
    locked: "Imefungwa",
    requiresLevel: "Inahitaji Ngazi",
    todaysLesson: "Jaribio la Leo",
    startLesson: "Anza Somo →",
    estTime: "Muda uliokadiriwa: Dakika 15",
    achievements: "Mishoni na Beji",
    listen: "🔊 Sikiliza",
    stop: "⏹ Acha",
    unlockedBtn: "Anza Somo",
    lockedBtn: "Imefungwa (Ngazi {lvl})",
    subjects: {
      coding: "Uprogramu",
      math: "Hisabati",
      ml: "Ujifunzaji wa Kina"
    },
    difficulty: {
      beginner: "Mwanafunzi",
      intermediate: "Wastani",
      advanced: "Kiadvance"
    },
    exerciseTypes: {
      visual: "Viblock vya Mwonekano",
      interactive: "Shirikishi",
      quiz: "Jaribio",
      project: "Mradi"
    },
    courses: [
      { id: 1, title: 'Uprogramu wa Mwonekano na Viblock', desc: 'Jifunze mantiki ya uprogramu kwa kutumia viblock rangi kama Scratch!', difficulty: 'beginner', icon: '�', progress: 75, lessons: 12, completed: 9, subject: 'coding', exerciseType: 'visual', xpReward: 150, timeEstimate: '10 min' },
      { id: 2, title: 'Ujifunzaji wa Kina kwa Watoto', desc: 'Fundisha kompyuta kutambua mifumo na kufatabiri.', difficulty: 'intermediate', icon: '🤖', progress: 45, lessons: 8, completed: 4, subject: 'ml', exerciseType: 'interactive', xpReward: 200, timeEstimate: '15 min' },
      { id: 3, title: 'Matukio ya Hisabati', desc: 'Suluhisha fumbo za hisabati na jenga uelewa wa namba.', difficulty: 'beginner', icon: '🔢', progress: 60, lessons: 15, completed: 9, subject: 'math', exerciseType: 'interactive', xpReward: 100, timeEstimate: '8 min' },
      { id: 4, title: 'Utambuzi wa Mifumo', desc: 'Fundisha mifumo ya AI kutambua picha na sauti.', difficulty: 'advanced', icon: '👁️', progress: 20, lessons: 6, completed: 1, subject: 'ml', exerciseType: 'project', xpReward: 300, timeEstimate: '20 min' },
      { id: 5, title: 'Misingi ya JavaScript', desc: 'Andika kanuni halisi na jenga tovuti shirikishi.', difficulty: 'intermediate', icon: '💻', progress: 35, lessons: 10, completed: 3, subject: 'coding', exerciseType: 'interactive', xpReward: 180, timeEstimate: '12 min' },
      { id: 6, title: 'Jiometri na Viumbe', desc: 'Gundua viumbe vya 2D na 3D kwa zoezi shirikishi.', difficulty: 'beginner', icon: '📐', progress: 80, lessons: 8, completed: 6, subject: 'math', exerciseType: 'visual', xpReward: 120, timeEstimate: '10 min' },
    ],
    todayTitle: "Jenga Mfumo Wako wa Kwanza wa AI",
    todayDesc: "Unda mfumo rahisi wa ujifunzaji wa kina unaweza kuainisha aina tofauti za wanyama! Utafundisha mfumo kwa mifano na kuangalia unavyojifunza - kama wanasayansi wa data halisi.",
    achList: [
      { title: 'Bwana wa Kanuni', desc: 'Kamilisha masomo 10 ya uprogramu', icon: '�', rarity: 'common' },
      { title: 'Mchawi wa Hisabati', desc: 'Suluhisha matatizo 50 ya hisabati', icon: '🔢', rarity: 'rare' },
      { title: 'Kivumbi cha ML', desc: 'Jenga mfumo wako wa kwanza wa AI', icon: '🤖', rarity: 'epic' },
      { title: 'Alama Kamili', desc: 'Pata alama 100% kwenye jaribio lolote', icon: '⭐', rarity: 'legendary' },
    ]
  },
  ar: {
    title: "منطقة التعلم",
    subtitle: "استكشف الدورات التفاعلية وأتقن مفاهيم جديدة ومثيرة!",
    enrolled: "الدورات المسجلة",
    completed: "الدروس المكتملة",
    streak: "سلسلة التعلم",
    level: "المستوى الحالي",
    yourCourses: "مسار التعلم الخاص بك",
    continue: "مواصلة التعلم",
    locked: "مغلق",
    requiresLevel: "يتطلب مستوى",
    todaysLesson: "مهمة اليوم",
    startLesson: "ابدأ الدرس ←",
    estTime: "الوقت المقدر: 15 دقيقة",
    achievements: "الأوسمة والجوائز",
    listen: "🔊 استمع",
    stop: "⏹ إيقاف",
    unlockedBtn: "ابدأ المهمة",
    lockedBtn: "مغلق (مستوى {lvl})",
    subjects: {
      coding: "البرمجة",
      math: "الرياضيات",
      ml: "التعلم الآلي"
    },
    difficulty: {
      beginner: "مبتدئ",
      intermediate: "متوسط",
      advanced: "متقدم"
    },
    exerciseTypes: {
      visual: "كتل بصرية",
      interactive: "تفاعلي",
      quiz: "اختبار",
      project: "مشروع"
    },
    courses: [
      { id: 1, title: 'البرمجة البصرية بالكتل', desc: 'تعلم منطق البرمجة باستخدام كتل ملونة مثل Scratch!', difficulty: 'beginner', icon: '🧩', progress: 75, lessons: 12, completed: 9, subject: 'coding', exerciseType: 'visual', xpReward: 150, timeEstimate: '10 دقيقة' },
      { id: 2, title: 'التعلم الآلي للأطفال', desc: 'علّم الكمبيوتر التعرف على الأنماط واتخاذ التنبؤات.', difficulty: 'intermediate', icon: '�', progress: 45, lessons: 8, completed: 4, subject: 'ml', exerciseType: 'interactive', xpReward: 200, timeEstimate: '15 دقيقة' },
      { id: 3, title: 'مغامرات الرياضيات', desc: 'حل ألغاز الرياضيات الممتعة وابنِ فهم الأرقام.', difficulty: 'beginner', icon: '🔢', progress: 60, lessons: 15, completed: 9, subject: 'math', exerciseType: 'interactive', xpReward: 100, timeEstimate: '8 دقيقة' },
      { id: 4, title: 'التعرف على الأنماط', desc: 'درّب نماذج الذكاء الاصطناعي على التعرف على الصور والأصوات.', difficulty: 'advanced', icon: '�️', progress: 20, lessons: 6, completed: 1, subject: 'ml', exerciseType: 'project', xpReward: 300, timeEstimate: '20 دقيقة' },
      { id: 5, title: 'أساسيات جافا سكريبت', desc: 'اكتب كودًا حقيقيًا وابنِ مواقع ويب تفاعلية.', difficulty: 'intermediate', icon: '💻', progress: 35, lessons: 10, completed: 3, subject: 'coding', exerciseType: 'interactive', xpReward: 180, timeEstimate: '12 دقيقة' },
      { id: 6, title: 'الهندسة والأشكال', desc: 'اكتشف الأشكال ثنائية وثلاثية الأبعاد من خلال تمارين تفاعلية.', difficulty: 'beginner', icon: '📐', progress: 80, lessons: 8, completed: 6, subject: 'math', exerciseType: 'visual', xpReward: 120, timeEstimate: '10 دقيقة' },
    ],
    todayTitle: "ابنِ نموذج الذكاء الاصطناعي الأول",
    todayDesc: "أنشئ نموذجًا بسيطًا للتعلم الآلي يمكنه تصنيف أنواع مختلفة من الحيوانات! ستقوم بتدريب النموذج بأمثلة ومشاهدة كيف يتعلم - تمامًا مثل علماء البيانات الحقيقيين.",
    achList: [
      { title: 'سيد البرمجة', desc: 'أكمل 10 دروس برمجة', icon: '�', rarity: 'common' },
      { title: 'ساحر الرياضيات', desc: 'حل 50 مسألة رياضية', icon: '🔢', rarity: 'rare' },
      { title: 'رائد التعلم الآلي', desc: 'ابنِ نموذج الذكاء الاصطناعي الأول', icon: '🤖', rarity: 'epic' },
      { title: 'درجة كاملة', desc: 'احصل على 100% في أي اختبار', icon: '⭐', rarity: 'legendary' },
    ]
  }
}

const coursePrereqs = {
  1: 1, // Visual Programming -> Level 1
  2: 2, // ML for Kids -> Level 2
  3: 1, // Math Adventures -> Level 1
  4: 3, // Pattern Recognition -> Level 3
  5: 2, // JavaScript Fundamentals -> Level 2
  6: 1, // Geometry & Shapes -> Level 1
}

export default function LearningZonePage() {
  const { level, addXP, addGold } = useGameStore()
  const [isLessonOpen, setIsLessonOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('en') // en, sw, ar
  const [speaking, setSpeaking] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState('all') // all, coding, math, ml
  const [selectedDifficulty, setSelectedDifficulty] = useState('all') // all, beginner, intermediate, advanced
  const [selectedExerciseType, setSelectedExerciseType] = useState('all') // all, visual, interactive, quiz, project
  const [adaptiveMode, setAdaptiveMode] = useState(true)
  const [currentStreak, setCurrentStreak] = useState(18)
  const [sessionTime, setSessionTime] = useState(0)
  const [isSessionActive, setIsSessionActive] = useState(false)

  const t = locales[currentLang]

  // Adaptive learning - filter courses based on performance
  const filteredCourses = useMemo(() => {
    return t.courses.filter(course => {
      const subjectMatch = selectedSubject === 'all' || course.subject === selectedSubject
      const difficultyMatch = selectedDifficulty === 'all' || course.difficulty === selectedDifficulty
      const exerciseTypeMatch = selectedExerciseType === 'all' || course.exerciseType === selectedExerciseType
      
      // Adaptive mode: show courses appropriate for current level
      const adaptiveMatch = !adaptiveMode || 
        (course.difficulty === 'beginner' && level >= 1) ||
        (course.difficulty === 'intermediate' && level >= 2) ||
        (course.difficulty === 'advanced' && level >= 3)
      
      return subjectMatch && difficultyMatch && exerciseTypeMatch && adaptiveMatch
    })
  }, [t.courses, selectedSubject, selectedDifficulty, selectedExerciseType, adaptiveMode, level])

  // Session timer
  useEffect(() => {
    let interval
    if (isSessionActive) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isSessionActive])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getSubjectIcon = (subject) => {
    switch(subject) {
      case 'coding': return <Code2 size={20} />
      case 'math': return <Calculator size={20} />
      case 'ml': return <Brain size={20} />
      default: return <BookOpen size={20} />
    }
  }

  const getSubjectColor = (subject) => {
    switch(subject) {
      case 'coding': return 'text-island-blue'
      case 'math': return 'text-tropical-green'
      case 'ml': return 'text-golden-sun'
      default: return 'text-white'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-[#2EE59D]/20 text-[#2EE59D]'
      case 'intermediate': return 'bg-[#FFCC00]/20 text-[#FFCC00]'
      case 'advanced': return 'bg-[#FF5C5C]/20 text-[#FF5C5C]'
      default: return 'bg-white/10 text-white'
    }
  }

  const getExerciseTypeIcon = (type) => {
    switch(type) {
      case 'visual': return '🧩'
      case 'interactive': return '🎮'
      case 'quiz': return '❓'
      case 'project': return '🚀'
      default: return '📚'
    }
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel()
        setSpeaking(false)
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      const langMap = { en: 'en-US', sw: 'sw-TZ', ar: 'ar-AE' }
      utterance.lang = langMap[currentLang] || 'en-US'
      utterance.rate = 0.9 // Slightly slower for kids
      
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)

      setSpeaking(true)
      window.speechSynthesis.speak(utterance)
    }
  }

  const startSession = () => {
    setIsSessionActive(true)
    setSessionTime(0)
  }

  const pauseSession = () => {
    setIsSessionActive(false)
  }

  const completeLesson = (xpReward, goldReward) => {
    addXP(xpReward)
    addGold(goldReward)
    setCurrentStreak(prev => prev + 1)
  }

  // Cancel speaking on unmount or language swap
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setSpeaking(false)
  }, [currentLang])

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-ocean text-white select-none">
      <TopNavigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Header with Language Selector & Session Timer */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-effect border border-island-blue border-opacity-30 mb-3">
              <Sparkles size={16} className="text-golden-sun animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-island-blue">Zanzibar Academy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-island-blue via-tropical-green to-golden-sun bg-clip-text text-transparent">
                {t.title}
              </span>
            </h1>
            <p className="text-text-secondary text-base md:text-lg">
              {t.subtitle}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Session Timer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 px-4 py-2 rounded-2xl glass-effect border border-white border-opacity-10"
            >
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-island-blue" />
                <span className="text-lg font-bold font-mono">{formatTime(sessionTime)}</span>
              </div>
              <div className="flex gap-1">
                {!isSessionActive ? (
                  <button
                    onClick={startSession}
                    className="p-2 rounded-lg bg-tropical-green/20 hover:bg-tropical-green/30 text-tropical-green transition-all"
                    title="Start Session"
                  >
                    <PlayCircle size={18} />
                  </button>
                ) : (
                  <button
                    onClick={pauseSession}
                    className="p-2 rounded-lg bg-golden-sun/20 hover:bg-golden-sun/30 text-golden-sun transition-all"
                    title="Pause Session"
                  >
                    <PauseCircle size={18} />
                  </button>
                )}
                <button
                  onClick={() => { setSessionTime(0); setIsSessionActive(false) }}
                  className="p-2 rounded-lg bg-coral-alert/20 hover:bg-coral-alert/30 text-coral-alert transition-all"
                  title="Reset Timer"
                >
                  <RotateCcw size={18} />
                </button>
              </div>
            </motion.div>

            {/* Language Selector */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-1.5 glass-effect rounded-2xl border border-white border-opacity-10"
            >
              {[
                { code: 'en', flag: '🇬🇧', label: 'English' },
                { code: 'sw', flag: '🇹🇿', label: 'Kiswahili' },
                { code: 'ar', flag: '🇴🇲', label: 'العربية' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLang(lang.code)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    currentLang === lang.code
                      ? 'bg-gradient-to-r from-island-blue to-tropical-green text-ocean-deep shadow-md transform scale-105'
                      : 'text-text-secondary hover:text-white hover:bg-white hover:bg-opacity-5'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span className="hidden sm:inline">{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Gamified Kids Stats Banner with Session Progress */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
        >
          {[
            { label: t.enrolled, value: '12', emoji: '📚', gradient: 'from-[#FF5C5C]/20 to-[#FF5C5C]/5 border-[#FF5C5C]' },
            { label: t.completed, value: '47', emoji: '✅', gradient: 'from-[#2EE59D]/20 to-[#2EE59D]/5 border-[#2EE59D]' },
            { label: t.streak, value: `${currentStreak} days`, emoji: '🔥', icon: <Flame className="text-[#FFCC00] animate-bounce" />, gradient: 'from-[#FFCC00]/20 to-[#FFCC00]/5 border-[#FFCC00]' },
            { label: t.level, value: `Lv. ${level}`, emoji: '⭐', icon: <GraduationCap className="text-[#00D4FF] animate-pulse" />, gradient: 'from-[#00D4FF]/20 to-[#00D4FF]/5 border-[#00D4FF]' },
            { label: 'Session Time', value: formatTime(sessionTime), emoji: '⏱️', icon: <Clock className="text-[#A78BFA]" />, gradient: 'from-[#A78BFA]/20 to-[#A78BFA]/5 border-[#A78BFA]' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`premium-card rounded-2xl p-4 border-t-4 ${stat.gradient} flex items-center gap-3 relative overflow-hidden group hover:scale-[1.03] transition-all duration-300`}
            >
              <div className="w-10 h-10 rounded-xl glass-effect flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
                {stat.icon ? stat.icon : stat.emoji}
              </div>
              <div>
                <p className="text-text-secondary text-[10px] font-semibold mb-1 uppercase tracking-wide">{stat.label}</p>
                <p className="text-xl font-black text-white">{stat.value}</p>
              </div>
              <div className="absolute -right-3 -bottom-3 text-6xl opacity-5 group-hover:scale-125 transition-all select-none">
                {stat.emoji}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subject & Difficulty Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Subject Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  selectedSubject === 'all'
                    ? 'bg-gradient-to-r from-island-blue to-tropical-green text-ocean-deep shadow-md'
                    : 'glass-effect text-text-secondary hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                All Subjects
              </button>
              {Object.entries(t.subjects).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSubject(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    selectedSubject === key
                      ? 'bg-gradient-to-r from-island-blue to-tropical-green text-ocean-deep shadow-md'
                      : 'glass-effect text-text-secondary hover:text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {getSubjectIcon(key)}
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Difficulty & Exercise Type Filters */}
            <div className="flex flex-wrap gap-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 rounded-xl text-sm font-semibold glass-effect text-text-secondary bg-transparent border border-white border-opacity-10 focus:border-island-blue focus:outline-none cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                {Object.entries(t.difficulty).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <select
                value={selectedExerciseType}
                onChange={(e) => setSelectedExerciseType(e.target.value)}
                className="px-4 py-2 rounded-xl text-sm font-semibold glass-effect text-text-secondary bg-transparent border border-white border-opacity-10 focus:border-island-blue focus:outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                {Object.entries(t.exerciseTypes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <button
                onClick={() => setAdaptiveMode(!adaptiveMode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  adaptiveMode
                    ? 'bg-gradient-to-r from-tropical-green to-island-blue text-ocean-deep shadow-md'
                    : 'glass-effect text-text-secondary hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Target size={16} />
                <span>Adaptive</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Learning Hub Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left/Middle Column: Courses Grid */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-black tracking-tight flex items-center gap-2.5">
                <Compass size={24} className="text-island-blue" />
                {t.yourCourses}
                <span className="text-sm font-normal text-text-secondary">({filteredCourses.length} courses)</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCourses.map((course) => {
                const requiredLevel = coursePrereqs[course.id]
                const isLocked = level < requiredLevel

                return (
                  <motion.div
                    key={course.id}
                    whileHover={!isLocked ? { y: -5 } : {}}
                    className={`premium-card rounded-2xl overflow-hidden relative border border-white border-opacity-5 ${
                      isLocked ? 'opacity-60 grayscale-[40%]' : 'hover:shadow-premium'
                    } transition-all duration-300`}
                  >
                    {/* Locked Watermark */}
                    {isLocked && (
                      <div className="absolute top-4 right-4 z-10 glass-effect p-2 rounded-xl border border-[#FF5C5C]/30 text-[#FF5C5C] flex items-center gap-1.5 text-xs font-black">
                        <Lock size={14} />
                        <span>Lv. {requiredLevel}</span>
                      </div>
                    )}

                    <div className="p-6 flex flex-col h-full justify-between gap-4">
                      <div>
                        {/* Course Header with Subject Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-island-blue/20 to-tropical-green/10 flex items-center justify-center text-4xl border border-white border-opacity-10 relative">
                            {course.icon}
                            {!isLocked && (
                              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-tropical-green rounded-full border-2 border-ocean-deep" />
                            )}
                          </div>
                          <div className="flex flex-col gap-1 items-end">
                            <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${getDifficultyColor(course.difficulty)}`}>
                              {t.difficulty[course.difficulty] || course.difficulty}
                            </span>
                            <div className={`flex items-center gap-1 text-xs font-semibold ${getSubjectColor(course.subject)}`}>
                              {getSubjectIcon(course.subject)}
                              <span>{t.subjects[course.subject]}</span>
                            </div>
                          </div>
                        </div>

                        {/* Title and description */}
                        <h3 className={`text-xl font-bold mb-2 ${isLocked ? 'text-text-secondary' : 'text-white'}`}>
                          {course.title}
                        </h3>
                        <p className="text-text-secondary text-sm leading-relaxed mb-4">
                          {course.desc}
                        </p>

                        {/* Exercise Type Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl">{getExerciseTypeIcon(course.exerciseType)}</span>
                          <span className="text-xs font-semibold text-text-secondary">
                            {t.exerciseTypes[course.exerciseType]}
                          </span>
                        </div>
                      </div>

                      <div>
                        {/* Progress slider */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-1.5 text-xs">
                            <span className="text-text-secondary font-medium">Progress</span>
                            <span className="font-extrabold text-island-blue">{course.completed}/{course.lessons}</span>
                          </div>
                          <div className="h-3 bg-white bg-opacity-5 rounded-full p-[2px] border border-white border-opacity-5">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${course.progress}%` }}
                              transition={{ duration: 1 }}
                              className="h-full bg-gradient-to-r from-island-blue to-tropical-green rounded-full relative"
                            >
                              {/* Glowing tip */}
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg shadow-white" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Rewards Info */}
                        <div className="flex items-center justify-between mb-4 text-xs">
                          <div className="flex items-center gap-1 text-golden-sun">
                            <Star size={14} />
                            <span className="font-semibold">+{course.xpReward} XP</span>
                          </div>
                          <div className="flex items-center gap-1 text-island-blue">
                            <Clock size={14} />
                            <span className="font-semibold">{course.timeEstimate}</span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        {isLocked ? (
                          <button
                            disabled
                            className="w-full py-3 rounded-xl bg-white bg-opacity-5 border border-white border-opacity-10 text-text-secondary font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                          >
                            <Lock size={16} />
                            {t.lockedBtn.replace('{lvl}', requiredLevel)}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setIsLessonOpen(true)
                              if (!isSessionActive) startSession()
                            }}
                            className="w-full py-3 rounded-xl premium-button-primary text-sm font-bold flex items-center justify-center gap-2 shadow-md"
                          >
                            {course.progress === 100 ? '✓ Completed' : t.unlockedBtn}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Featured Quest & Badges */}
          <div className="space-y-8">
            {/* Quest Card - Enhanced ML Experience */}
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tight flex items-center gap-2">
                <Sparkles size={24} className="text-golden-sun animate-pulse" />
                {t.todaysLesson}
              </h2>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="premium-card rounded-3xl p-6 border border-golden-sun border-opacity-35 relative overflow-hidden bg-gradient-to-br from-ocean-surface to-golden-sun/5 shadow-premium"
              >
                {/* Glow particle */}
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-golden-sun opacity-15 rounded-full blur-2xl" />
                <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-tropical-green opacity-15 rounded-full blur-2xl" />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl animate-float">🤖</span>
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-golden-sun/20 border border-golden-sun/30">
                        <Brain size={16} className="text-golden-sun" />
                        <span className="text-xs font-bold text-golden-sun">ML Challenge</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => speakText(`${t.todayTitle}. ${t.todayDesc}`)}
                        className={`p-2.5 rounded-xl border border-white border-opacity-10 text-sm font-semibold transition-all flex items-center justify-center ${
                          speaking ? 'bg-coral-alert hover:bg-opacity-80 text-white' : 'glass-effect hover:bg-white hover:bg-opacity-10 text-island-blue'
                        }`}
                        title="Read aloud"
                      >
                        {speaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">
                      {t.todayTitle}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {t.todayDesc}
                    </p>
                  </div>

                  {/* Interactive Preview */}
                  <div className="glass-effect rounded-2xl p-4 border border-white border-opacity-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex gap-1">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-island-blue/30 to-tropical-green/30 border border-white/20 flex items-center justify-center text-lg"
                          >
                            {['🐱', '🐶', '🐰'][i-1]}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '75%' }}
                          transition={{ duration: 1.5, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-golden-sun to-tropical-green"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-text-secondary text-center">
                      <span className="text-golden-sun font-semibold">75% accuracy</span> • Training your model...
                    </p>
                  </div>

                  <hr className="border-white border-opacity-10" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-golden-sun">
                        <Clock size={14} />
                        <span className="text-xs font-bold">20 mins</span>
                      </div>
                      <div className="flex items-center gap-1 text-tropical-green">
                        <Star size={14} />
                        <span className="text-xs font-bold">+300 XP</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsLessonOpen(true)
                        if (!isSessionActive) startSession()
                      }}
                      className="premium-button-primary text-xs font-bold px-4 py-2.5 flex items-center gap-1.5 shadow-premium"
                    >
                      <PlayCircle size={16} />
                      {t.startLesson}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Learning Progress Card */}
            <div className="premium-card rounded-3xl p-6 border border-tropical-green border-opacity-30">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp size={20} className="text-tropical-green" />
                <h3 className="font-bold text-lg">Your Progress</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="text-text-secondary">Weekly Goal</span>
                    <span className="font-semibold text-tropical-green">75%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-tropical-green to-island-blue rounded-full"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="glass-effect rounded-xl p-3">
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-[10px] text-text-secondary">Lessons</p>
                  </div>
                  <div className="glass-effect rounded-xl p-3">
                    <p className="text-2xl font-bold text-golden-sun">850</p>
                    <p className="text-[10px] text-text-secondary">XP Earned</p>
                  </div>
                  <div className="glass-effect rounded-xl p-3">
                    <p className="text-2xl font-bold text-island-blue">92%</p>
                    <p className="text-[10px] text-text-secondary">Accuracy</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges Column - Enhanced */}
            <div>
              <h2 className="text-2xl font-black mb-6 tracking-tight flex items-center gap-2">
                <Award size={24} className="text-tropical-green" />
                {t.achievements}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {t.achList.map((ach, index) => {
                  const rarityColors = {
                    common: 'border-[#C7D0D9]/20 text-[#C7D0D9] bg-[#C7D0D9]/5',
                    rare: 'border-island-blue/30 text-island-blue bg-island-blue/5',
                    epic: 'border-tropical-green/30 text-tropical-green bg-tropical-green/5',
                    legendary: 'border-golden-sun/45 text-golden-sun bg-golden-sun/5 shadow-md shadow-golden-sun/5',
                  }

                  return (
                    <motion.div
                      key={ach.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`premium-card rounded-2xl p-4 text-center border ${rarityColors[ach.rarity]} flex flex-col items-center justify-center gap-2.5 hover:scale-[1.05] transition-all duration-300 cursor-pointer`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center text-3xl shadow-inner shadow-white/5">
                          {ach.icon}
                        </div>
                        {ach.rarity === 'legendary' && (
                          <div className="absolute -top-1 -right-1">
                            <Trophy size={16} className="text-golden-sun animate-pulse" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white">{ach.title}</h4>
                        <p className="text-[10px] text-text-secondary mt-0.5 leading-tight">{ach.desc}</p>
                      </div>
                      <div className={`text-[8px] font-bold uppercase tracking-wider ${
                        ach.rarity === 'legendary' ? 'text-golden-sun' :
                        ach.rarity === 'epic' ? 'text-tropical-green' :
                        ach.rarity === 'rare' ? 'text-island-blue' :
                        'text-text-secondary'
                      }`}>
                        {ach.rarity}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick Tips Section */}
              <div className="mt-6 glass-effect rounded-2xl p-4 border border-white border-opacity-10">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb size={18} className="text-golden-sun" />
                  <h4 className="font-bold text-sm">Learning Tips</h4>
                </div>
                <ul className="space-y-2 text-xs text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-tropical-green">•</span>
                    <span>Start with visual blocks to understand logic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-tropical-green">•</span>
                    <span>Practice daily to build your streak</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-tropical-green">•</span>
                    <span>Use the adaptive mode for personalized learning</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Code Challenge Sandbox Modal */}
      <InteractiveLesson isOpen={isLessonOpen} onClose={() => setIsLessonOpen(false)} />
    </div>
  )
}
