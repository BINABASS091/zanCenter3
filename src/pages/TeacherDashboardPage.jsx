import { motion } from 'framer-motion'
import { useState } from 'react'
import TopNavigation from '../components/TopNavigation'
import { Users, ChartBar as BarChart3, BookCheck, FileText, TrendingUp, Award, Download, CircleCheck as CheckCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

const classData = [
  { name: 'Completed', value: 68, color: '#2EE59D' },
  { name: 'In Progress', value: 22, color: '#00D4FF' },
  { name: 'Needs Help', value: 10, color: '#FF5C5C' },
]

const progressData = [
  { name: 'Class A', progress: 82 },
  { name: 'Class B', progress: 74 },
  { name: 'Class C', progress: 91 },
  { name: 'Class D', progress: 65 },
]

const REPORTS = [
  {
    id: 'weekly',
    label: 'Weekly class summary',
    description: 'Overview of class activities, completion rates, and top performers for the week.',
    filename: 'weekly-class-summary.txt',
    content: () => [
      '=== Weekly Class Summary — Zanzibar.Center ===',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      'Class Progress Overview:',
      ...progressData.map((c) => `  ${c.name}: ${c.progress}%`),
      '',
      'Status Distribution:',
      ...classData.map((s) => `  ${s.name}: ${s.value}%`),
    ].join('\n'),
  },
  {
    id: 'atrisk',
    label: 'At-risk learner report',
    description: 'Students below the 65% progress threshold who may need additional support.',
    filename: 'at-risk-learners.txt',
    content: () => [
      '=== At-Risk Learner Report — Zanzibar.Center ===',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      'Students Needing Support:',
      '  Class D — 65% (below threshold)',
      '',
      'Recommended Actions:',
      '  - Schedule 1:1 check-in sessions',
      '  - Assign targeted mini-game challenges',
      '  - Notify parents via Parent Dashboard',
    ].join('\n'),
  },
  {
    id: 'milestone',
    label: 'Achievement milestone report',
    description: 'Summary of achievement badges and milestones reached across all classes.',
    filename: 'achievement-milestones.txt',
    content: () => [
      '=== Achievement Milestone Report — Zanzibar.Center ===',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      'Total Certificates Issued: 24',
      'Projects Reviewed: 48',
      '',
      'Top Achievements This Week:',
      '  ★ Maya — Solar Island Grid — A+',
      '  ★ Liam — Water Cycle Explorer — A',
      '  ★ Noah — Code Challenge 3 — B+',
    ].join('\n'),
  },
  {
    id: 'parent',
    label: 'Parent progress export',
    description: 'Ready-to-share PDF-style summary for parent-teacher meetings.',
    filename: 'parent-progress-export.txt',
    content: () => [
      '=== Parent Progress Export — Zanzibar.Center ===',
      `Generated: ${new Date().toLocaleDateString()}`,
      '',
      'Class Average Progress: 78%',
      'Students on Track: 68%',
      'Students In Progress: 22%',
      'Students Needing Help: 10%',
      '',
      'This report is suitable for sharing with parents at scheduled review meetings.',
    ].join('\n'),
  },
]

function downloadTextFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

export default function TeacherDashboardPage() {
  const [downloadedReports, setDownloadedReports] = useState([])

  const iconColors = {
    'island-blue': '#00D4FF',
    'tropical-green': '#2EE59D',
    'golden-sun': '#FFCC00',
    'coral-alert': '#FF5C5C',
  }

  const handleDownloadReport = (report) => {
    downloadTextFile(report.filename, report.content())
    setDownloadedReports((prev) => [...new Set([...prev, report.id])])
  }

  const exportCsv = () => {
    const rows = [
      ['Student', 'Project', 'Score', 'Status'],
      ['Maya', 'Solar Island Grid', 'A+', 'Excellent'],
      ['Liam', 'Water Cycle Explorer', 'A', 'Great'],
      ['Noah', 'Code Challenge 3', 'B+', 'Improving'],
    ]
    const csv = rows.map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'zanzibar-center-teacher-report.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Teacher Dashboard</h1>
          <p className="text-text-secondary text-lg">Track student progress, review projects, and manage learning outcomes</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Students', value: '126', icon: <Users />, color: 'island-blue' },
            { label: 'Avg. Progress', value: '78%', icon: <TrendingUp />, color: 'tropical-green' },
            { label: 'Projects Reviewed', value: '48', icon: <BookCheck />, color: 'golden-sun' },
            { label: 'Certificates', value: '24', icon: <Award />, color: 'coral-alert' },
          ].map((item) => (
            <div key={item.label} className="premium-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl" style={{ color: iconColors[item.color] }}>{item.icon}</div>
                <span className="text-xs text-text-secondary">Live</span>
              </div>
              <p className="text-text-secondary text-sm mb-1">{item.label}</p>
              <p className="text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid xl:grid-cols-3 gap-8 mb-12">
          <div className="xl:col-span-2 premium-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><BarChart3 size={24} /> Class Progress</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#C7D0D9" />
                  <YAxis stroke="#C7D0D9" />
                  <Tooltip contentStyle={{ background: '#0B1320', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                  <Bar dataKey="progress" fill="#00D4FF" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="premium-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><FileText size={24} /> Status</h2>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={classData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={4}>
                    {classData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#0B1320', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="premium-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Student Reviews</h2>
              <button onClick={exportCsv} className="premium-button-secondary text-sm flex items-center gap-2">
                <Download size={16} /> Export CSV
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Maya', project: 'Solar Island Grid', score: 'A+', status: 'Excellent' },
                { name: 'Liam', project: 'Water Cycle Explorer', score: 'A', status: 'Great' },
                { name: 'Noah', project: 'Code Challenge 3', score: 'B+', status: 'Improving' },
              ].map((student) => (
                <div key={student.name} className="glass-effect rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold">{student.name}</p>
                    <p className="text-xs text-text-secondary">{student.project}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-island-blue">{student.score}</p>
                    <p className="text-xs text-text-secondary">{student.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="premium-card rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Reports</h2>
            <div className="space-y-3">
              {REPORTS.map((report) => {
                const downloaded = downloadedReports.includes(report.id)
                return (
                  <button
                    key={report.id}
                    onClick={() => handleDownloadReport(report)}
                    className="w-full glass-effect rounded-xl p-4 text-left hover:shadow-premium hover:border-island-blue/30 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm group-hover:text-island-blue transition-colors">{report.label}</p>
                        <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{report.description}</p>
                      </div>
                      {downloaded ? (
                        <CheckCircle size={16} className="text-tropical-green shrink-0 mt-0.5" />
                      ) : (
                        <Download size={14} className="text-text-secondary group-hover:text-island-blue transition-colors shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
