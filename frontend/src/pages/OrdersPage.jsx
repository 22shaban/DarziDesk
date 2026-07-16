import { FiPlus } from 'react-icons/fi'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getOrders } from '../services/ordersApi'

import NewOrderModal from '../components/orders/NewOrderModal'
import OrderTable from '../components/orders/OrderTable'
import SearchBar from '../components/orders/SearchBar'

import './OrdersPage.css'

const PAGE_SIZE = 5

function OrdersPage() {
  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)

  async function loadOrders() {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  function handleCreateInvoice(order) {
    navigate('/invoices', {
      state: {
        selectedOrder: order,
      },
    })
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const keyword = searchText.toLowerCase()

      const matchesSearch =
        order.customerName.toLowerCase().includes(keyword) ||
        order.phone.toLowerCase().includes(keyword) ||
        order.orderId.toLowerCase().includes(keyword)

      const matchesStatus =
        statusFilter === 'All'
          ? true
          : order.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [orders, searchText, statusFilter])

  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE) || 1

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [searchText, statusFilter])

  return (
    <section className="orders-page">
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h1 className="mb-1">Orders</h1>

          <p className="mb-0">
            Manage order workflow in a clean desktop workspace.
          </p>
        </div>

        <button
          className="btn orders-new-order-btn"
          onClick={() => setShowModal(true)}
        >
          <FiPlus className="me-2" />
          New Order
        </button>

      </div>

      <div className="orders-toolbar card p-3 mb-4">

        <div className="row g-3 align-items-end">

          <div className="col-md-6">

            <SearchBar
              placeholder="Search customer, phone or order..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

          </div>

          <div className="col-md-3">

            <label className="form-label">
              Status
            </label>

            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>

              <option value="Pending">
                Pending
              </option>

              <option value="Completed">
                Completed
              </option>

            </select>

          </div>

        </div>

      </div>

    <OrderTable
  orders={paginatedOrders}
  onEdit={loadOrders}
  onDelete={loadOrders}
  onCreateInvoice={handleCreateInvoice}
/>

      <div className="orders-pagination-placeholder mt-4 d-flex justify-content-center align-items-center gap-3">

        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          Next
        </button>

      </div>

     {showModal && (
  <NewOrderModal
    onClose={() => setShowModal(false)}
    onSaved={loadOrders}
  />
)}

    </section>
  )
}

export default OrdersPage