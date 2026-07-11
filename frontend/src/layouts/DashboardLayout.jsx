import { Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'
import './DashboardLayout.css'

function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()

  const pageTitle = useMemo(() => {
    if (location.pathname.includes('/dashboard')) {
      return 'Dashboard'
    }
    return 'Dashboard'
  }, [location.pathname])

  return (
    <div className="dashboard-shell">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="dashboard-main">
        <TopNavbar
          onToggle={() => setSidebarCollapsed((previous) => !previous)}
          pageTitle={pageTitle}
        />

        <main className="dashboard-content px-4 py-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayout
