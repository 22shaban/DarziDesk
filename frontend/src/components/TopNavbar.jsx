import { FiBell, FiChevronDown, FiMenu, FiPlus } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import './TopNavbar.css'
import { useShop } from "../context/ShopContext";

const routeTitleMap = {
  '/dashboard': 'Dashboard',
  '/orders': 'Orders',
  '/customers': 'Customers',
  '/measurements': 'Measurements',
  '/inventory': 'Fabric & Inventory',
  '/employees': 'Employees',
  '/invoices': 'Invoices',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

function TopNavbar({ onToggle }) {
  const location = useLocation()
  const { shop } = useShop();
  const navigate = useNavigate()
  const pageTitle = routeTitleMap[location.pathname] ?? 'Dashboard'

  function handleLogout() {
  localStorage.removeItem("darzidesk-token");
  localStorage.removeItem("darzidesk-owner");

  sessionStorage.removeItem("darzidesk-token");
  sessionStorage.removeItem("darzidesk-owner");

  navigate("/login");
}

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
          <div className="d-flex align-items-center">
  <img
    src={shop?.logoUrl || "/logo/darzidesk-logo.png"}
    alt="Shop Logo"
    className="top-navbar-shop-logo"
  />

  <span className="ms-2">
    {shop?.shopName || "DarziDesk"}
  </span>

  <FiChevronDown className="ms-2" />
</div>
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
              <button
  className="dropdown-item text-danger"
  type="button"
  onClick={handleLogout}
>
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
