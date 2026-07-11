import { NavLink } from 'react-router-dom'
import {
  FiBarChart2,
  FiBox,
  FiClipboard,
  FiFileText,
  FiGrid,
  FiLayers,
  FiSettings,
  FiShoppingBag,
  FiUsers,
} from 'react-icons/fi'
import './Sidebar.css'

const menuItems = [
  { label: 'Dashboard', icon: FiGrid, to: '/dashboard' },
  { label: 'Orders', icon: FiClipboard, to: '/dashboard' },
  { label: 'Customers', icon: FiUsers, to: '/dashboard' },
  { label: 'Measurements', icon: FiShoppingBag, to: '/dashboard' },
  { label: 'Fabric & Inventory', icon: FiLayers, to: '/dashboard' },
  { label: 'Employees', icon: FiUsers, to: '/dashboard' },
  { label: 'Invoices', icon: FiFileText, to: '/dashboard' },
  { label: 'Reports', icon: FiBarChart2, to: '/dashboard' },
  { label: 'Settings', icon: FiSettings, to: '/dashboard' },
]

function Sidebar({ collapsed }) {
  return (
    <aside className={`sidebar-shell ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand px-3 py-3">
        <img
          src="/logo/darzidesk-logo.png"
          alt="DarziDesk logo"
          className="sidebar-logo"
        />
        {!collapsed && (
          <div className="sidebar-brand-copy ms-2">
            <h1 className="mb-0">DarziDesk</h1>
            <p className="mb-0">Tailor Shop Management System</p>
          </div>
        )}
      </div>

      <nav className="sidebar-nav px-2 py-2" aria-label="Sidebar navigation">
        {menuItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            title={collapsed ? label : ''}
            className={({ isActive }) =>
              `sidebar-link ${isActive && label === 'Dashboard' ? 'active' : ''}`
            }
          >
            <Icon className="sidebar-icon" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer px-3 pb-3">
        <span className="d-inline-flex align-items-center gap-2">
          <FiBox />
          {!collapsed && 'Desktop App Shell'}
        </span>
      </div>
    </aside>
  )
}

export default Sidebar
