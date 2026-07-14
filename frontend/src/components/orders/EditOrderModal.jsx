import { useState } from 'react'
import { updateOrder } from '../../services/ordersApi'
import './NewOrderModal.css'

function EditOrderModal({ order, onClose, onUpdated }) {
  const [customerName, setCustomerName] = useState(order.customerName)
  const [phone, setPhone] = useState(order.phone)
  const [garmentType, setGarmentType] = useState(order.garmentType)
  const [deliveryDate, setDeliveryDate] = useState(order.deliveryDate || '')
  const [assignedTailor, setAssignedTailor] = useState(order.assignedTailor || '')
  const [advance, setAdvance] = useState(order.advance || '0')
  const [remaining, setRemaining] = useState(order.remaining || '0')
  const [status, setStatus] = useState(order.status)

  async function handleUpdate() {
    try {
      await updateOrder(order.orderId, {
        customerName,
        phone,
        garmentType,
        deliveryDate,
        assignedTailor,
        advance,
        remaining,
        status,
      })

      alert('Order updated successfully!')

      await onUpdated()

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
          <label className="form-label">Delivery Date</label>
          <input
            type="date"
            className="form-control"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Assigned Tailor</label>
          <input
            className="form-control"
            value={assignedTailor}
            onChange={(e) => setAssignedTailor(e.target.value)}
          />
        </div>

        <div className="row mb-3">

          <div className="col">
            <label className="form-label">Advance</label>
            <input
              type="number"
              className="form-control"
              value={advance}
              onChange={(e) => setAdvance(e.target.value)}
            />
          </div>

          <div className="col">
            <label className="form-label">Remaining</label>
            <input
              type="number"
              className="form-control"
              value={remaining}
              onChange={(e) => setRemaining(e.target.value)}
            />
          </div>

        </div>

        <div className="mb-4">
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

          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleUpdate}
          >
            Update Order
          </button>

        </div>

      </div>
    </div>
  )
}

export default EditOrderModal