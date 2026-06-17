import TopNavigation from '../components/TopNavigation'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-ocean text-white">
      <TopNavigation />
      <div>{children}</div>
    </div>
  )
}
