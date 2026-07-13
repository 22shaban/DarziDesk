import { useState } from 'react'

function EditOrderModal({ order, onClose }) {
  const [customerName, setCustomerName] = useState(order.customerName)
  const [phone, setPhone] = useState(order.phone)
  const [garmentType, setGarmentType] = useState(order.garmentType)
  const [status, setStatus] = useState(order.status)

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
            <option>Measurements</option>
            <option>Cutting</option>
            <option>Stitching</option>
            <option>Ready</option>
            <option>Delivered</option>
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
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditOrderModal