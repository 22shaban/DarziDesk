import { FiPlus } from 'react-icons/fi'
import InventorySearch from '../components/inventory/InventorySearch'
import InventoryTable from '../components/inventory/InventoryTable'
import './InventoryPage.css'

function InventoryPage() {
  return (
    <section className="inventory-page">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Fabric & Inventory</h1>
        </div>

        <button type="button" className="btn inventory-add-btn">
          <FiPlus className="me-2" />
          Add Fabric
        </button>
      </div>

      <div className="inventory-toolbar card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-5">
            <InventorySearch />
          </div>

          <div className="col-3 ms-auto">
            <label className="form-label mb-2 inventory-filter-label" htmlFor="statusFilter">
              Status
            </label>
            <select id="statusFilter" className="form-select inventory-filter-select">
              <option>All Statuses</option>
              <option>Low Stock</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      <InventoryTable />

      <div className="row g-3 mt-4">
        <div className="col-3">
          <article className="inventory-summary-card p-3">
            <h2 className="mb-1">Total Fabrics</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="inventory-summary-card p-3">
            <h2 className="mb-1">Inventory Value</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="inventory-summary-card p-3">
            <h2 className="mb-1">Low Stock Items</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="inventory-summary-card p-3">
            <h2 className="mb-1">Customer Supplied Fabric</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
      </div>

      <div className="inventory-pagination-placeholder mt-4">
        Pagination placeholder
      </div>
    </section>
  )
}

export default InventoryPage
