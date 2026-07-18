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
import { useEffect, useState } from "react";
import { getSettings } from "../services/settingsApi";

const menuItems = [
  { label: 'Dashboard', icon: FiGrid, to: '/dashboard' },
  { label: 'Orders', icon: FiClipboard, to: '/orders' },
  { label: 'Customers', icon: FiUsers, to: '/customers' },
  { label: 'Measurements', icon: FiShoppingBag, to: '/measurements' },
  { label: 'Fabric & Inventory', icon: FiLayers, to: '/inventory' },
  { label: 'Employees', icon: FiUsers, to: '/employees' },
  { label: 'Invoices', icon: FiFileText, to: '/invoices' },
  { label: 'Reports', icon: FiBarChart2, to: '/reports' },
  { label: 'Settings', icon: FiSettings, to: '/settings' },
]

function Sidebar({ collapsed }) {
  const [logoUrl, setLogoUrl] = useState("");

useEffect(() => {
  async function loadLogo() {
    try {
      const settings = await getSettings();
      setLogoUrl(settings.logoUrl || "");
    } catch (error) {
      console.error(error);
    }
  }

  loadLogo();
}, []);
  return (
    <aside className={`sidebar-shell ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand px-3 py-3">
        <img
  src={logoUrl || "/logo/darzidesk-logo.png"}
  alt="Shop Logo"
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
  `sidebar-link ${isActive ? 'active' : ''}`
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
