import { useState } from 'react'
import './NewOrderModal.css'
import { createOrder } from '../../services/ordersApi'


function NewOrderModal({ onClose }) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [garmentType, setGarmentType] = useState('')

  async function handleSave() {
  try {
    await createOrder({
      customerName,
      phone,
      garmentType,
      status: 'Pending',
    })

    alert('Order created successfully!')

    onClose()

    window.location.reload()
  } catch (error) {
    console.error(error)
    alert('Failed to create order')
  }
}

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>New Order</h2>

        <div className="mb-3">
          <label className="form-label">Customer Name</label>
        <input
  type="text"
  className="form-control"
  placeholder="Enter customer name"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
/>
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
        <input
  type="text"
  className="form-control"
  placeholder="Enter phone number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>
        </div>

        <div className="mb-3">
          <label className="form-label">Garment Type</label>
         <input
  type="text"
  className="form-control"
  placeholder="Example: Suit"
  value={garmentType}
  onChange={(e) => setGarmentType(e.target.value)}
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
  Save Order
</button>
        </div>
      </div>
    </div>
  )
}

export default NewOrderModal