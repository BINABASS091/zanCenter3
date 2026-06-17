import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

const LandingPage = lazy(() => import('../pages/LandingPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const GameHubPage = lazy(() => import('../pages/GameHubPage'))
const IslandMapPage = lazy(() => import('../pages/IslandMapPage'))
const ReactCoursePage = lazy(() => import('../pages/ReactCoursePage'))
const ExplorePage = lazy(() => import('../pages/ExplorePage'))
const PortfolioPage = lazy(() => import('../pages/PortfolioPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const ParentDashboardPage = lazy(() => import('../pages/ParentDashboardPage'))
const TeacherDashboardPage = lazy(() => import('../pages/TeacherDashboardPage'))
const LearningZonePage = lazy(() => import('../pages/LearningZonePage'))
const CampInfoPage = lazy(() => import('../pages/CampInfoPage'))

function RouteFallback() {
  return (
    <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce-in">🏝️</div>
        <p className="text-text-secondary animate-pulse">Loading Experience Hub...</p>
      </div>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/hub" element={<GameHubPage />} />
        <Route path="/island" element={<IslandMapPage />} />
        <Route path="/react-course" element={<ReactCoursePage />} />
        <Route path="/learning" element={<LearningZonePage />} />
        <Route path="/camp" element={<CampInfoPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/parent" element={<ParentDashboardPage />} />
        <Route path="/teacher" element={<TeacherDashboardPage />} />
      </Routes>
    </Suspense>
  )
}
