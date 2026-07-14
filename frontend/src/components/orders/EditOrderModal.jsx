import { useState } from 'react'
import { updateOrder } from '../../services/ordersApi'
import './NewOrderModal.css'

function EditOrderModal({ order, onClose, onUpdated }) {
  const [customerName, setCustomerName] = useState(order.customerName)
  const [phone, setPhone] = useState(order.phone)
  const [garmentType, setGarmentType] = useState(order.garmentType)
  const [status, setStatus] = useState(order.status)

  async function handleUpdate() {
    try {
      await updateOrder(order.orderId, {
        customerName,
        phone,
        garmentType,
        status,
      })

      alert('Order updated successfully!')

      onUpdated()
      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to update order')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Edit Order</h2>

        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Garment Type</label>
          <input
            className="form-control"
            value={garmentType}
            onChange={(e) => setGarmentType(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Pending</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>

          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Order
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditOrderModal