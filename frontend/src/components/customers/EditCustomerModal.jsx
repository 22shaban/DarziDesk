import { useState } from 'react'
import { updateCustomer } from '../../services/customersApi'

import '../orders/NewOrderModal.css'

function EditCustomerModal({ customer, onClose, onUpdated }) {
  const [customerName, setCustomerName] = useState(customer.customerName)
  const [phone, setPhone] = useState(customer.phone)
  const [email, setEmail] = useState(customer.email)
  const [address, setAddress] = useState(customer.address)

  async function handleUpdate() {
    if (!customerName || !phone) {
      alert('Customer Name and Phone are required.')
      return
    }

    try {
      await updateCustomer(customer.customerId, {
        customerName,
        phone,
        email,
        address,
      })

      alert('Customer updated successfully!')

      await onUpdated()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to update customer')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Edit Customer</h2>

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
          <label className="form-label">Email</label>

          <input
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>

          <textarea
            className="form-control"
            rows="3"
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
            onClick={handleUpdate}
          >
            Update Customer
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditCustomerModal