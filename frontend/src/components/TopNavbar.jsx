import { FiBell, FiChevronDown, FiMenu, FiPlus } from 'react-icons/fi'
import './TopNavbar.css'

function TopNavbar({ onToggle, pageTitle = 'Dashboard' }) {
  return (
    <header className="top-navbar-shell px-4">
      <div className="top-navbar-left d-flex align-items-center gap-3">
        <button
          type="button"
          className="btn top-navbar-btn"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          <FiMenu />
        </button>
        <h2 className="mb-0">{pageTitle}</h2>
      </div>

      <div className="top-navbar-right d-flex align-items-center gap-2">
        <button type="button" className="btn top-navbar-btn" aria-label="Notifications">
          <FiBell />
        </button>

        <div className="dropdown">
          <button
            className="btn top-navbar-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FiPlus className="me-2" />
            Quick Actions
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button">
                New Order
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Add Customer
              </button>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <button
            className="btn top-navbar-btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Royal Men's Tailor <FiChevronDown className="ms-1" />
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button className="dropdown-item" type="button">
                Store Profile
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Change Password
              </button>
            </li>
            <li>
              <button className="dropdown-item" type="button">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default TopNavbar
