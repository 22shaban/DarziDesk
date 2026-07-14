import { useState } from 'react'
import { createCustomer } from '../../services/customersApi'

import '../orders/NewOrderModal.css'

function AddCustomerModal({ onClose, onCreated }) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  async function handleSave() {
    if (!customerName || !phone) {
      alert('Customer Name and Phone are required.')
      return
    }

    try {
      await createCustomer({
        customerName,
        phone,
        email,
        address,
      })

      alert('Customer created successfully!')

      await onCreated()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to create customer')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Add Customer</h2>

        <div className="mb-3">
          <label className="form-label">Customer Name</label>

          <input
            className="form-control"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>

          <input
            className="form-control"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>

          <textarea
            className="form-control"
            rows="3"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
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
            onClick={handleSave}
          >
            Save Customer
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCustomerModal