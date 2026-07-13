import { FiPlus } from 'react-icons/fi'
import { useState } from 'react'
import NewOrderModal from '../components/orders/NewOrderModal'
import OrderTable from '../components/orders/OrderTable'
import SearchBar from '../components/orders/SearchBar'
import './OrdersPage.css'

function OrdersPage() {
    const [showModal, setShowModal] = useState(false)
  return (
    <section className="orders-page">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Orders</h1>
          <p className="mb-0">Manage order workflow in a clean desktop workspace.</p>
        </div>

        <button
  type="button"
  className="btn orders-new-order-btn"
  onClick={() => setShowModal(true)}
>
          <FiPlus className="me-2" />
          New Order
        </button>
      </div>

      <div className="orders-toolbar card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-5">
            <SearchBar placeholder="Search orders" />
          </div>

          <div className="col-3 ms-auto">
            <label className="form-label mb-2 orders-filter-label" htmlFor="statusFilter">
              Status
            </label>
            <select id="statusFilter" className="form-select orders-filter-select">
              <option>All Statuses</option>
              <option>New</option>
              <option>Measurements</option>
              <option>Cutting</option>
              <option>Stitching</option>
              <option>Quality Check</option>
              <option>Ready</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>
      </div>

      <OrderTable />

      <div className="orders-pagination-placeholder mt-4">
        Pagination footer placeholder
      </div>
      {showModal && (
  <NewOrderModal
    onClose={() => setShowModal(false)}
  />
)}
    </section>
  )
}

export default OrdersPage
