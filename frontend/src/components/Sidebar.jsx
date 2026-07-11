import { FiChevronsLeft, FiChevronsRight, FiLayout } from 'react-icons/fi'

function Sidebar({ collapsed, onToggle }) {
  return (
    <aside className={`sidebar bg-dark text-light ${collapsed ? 'collapsed' : ''}`}>
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary">
        {!collapsed && <span className="fw-semibold">DarziDesk</span>}
        <button
          type="button"
          className="btn btn-sm btn-outline-light"
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
        </button>
      </div>

      <nav className="p-3">
        <span className="d-inline-flex align-items-center gap-2 text-secondary small">
          <FiLayout />
          {!collapsed && 'Navigation Placeholder'}
        </span>
      </nav>
    </aside>
  )
}

export default Sidebar
