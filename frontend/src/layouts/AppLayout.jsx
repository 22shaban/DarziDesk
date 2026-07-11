import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'

function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="app-shell d-flex">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />
      <div className="app-content flex-grow-1">
        <TopNavbar />
        <main className="container-fluid py-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
