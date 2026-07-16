import { useState } from 'react'
import './NewOrderModal.css'
import { createOrder } from '../../services/ordersApi'

function NewOrderModal({ onClose }) {
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [garmentType, setGarmentType] = useState('')
  const [deliveryDate, setDeliveryDate] = useState('')
  const [assignedTailor, setAssignedTailor] = useState('')

  const [totalAmount, setTotalAmount] = useState('')
  const [advance, setAdvance] = useState('')
  const [remaining, setRemaining] = useState('')

  function handleTotalChange(value) {
    setTotalAmount(value)

    const total = Number(value || 0)
    const adv = Number(advance || 0)

    setRemaining(Math.max(total - adv, 0))
  }

  function handleAdvanceChange(value) {
    const total = Number(totalAmount || 0)

    const adv = Math.min(
      Number(value || 0),
      total
    )

    setAdvance(adv)
    setRemaining(total - adv)
  }

  async function handleSave() {
    try {
      await createOrder({
        customerName,
        phone,
        garmentType,
        status: 'Pending',
        deliveryDate,
        assignedTailor,
        totalAmount,
        advance,
        remaining,
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

        <h2 className="mb-4">
          New Order
        </h2>

        <div className="mb-3">
          <label className="form-label">
            Customer Name
          </label>

          <input
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Phone
          </label>

          <input
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Garment Type
          </label>

          <input
            className="form-control"
            value={garmentType}
            onChange={(e) => setGarmentType(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Delivery Date
          </label>

          <input
            type="date"
            className="form-control"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Assigned Tailor
          </label>

          <input
            className="form-control"
            value={assignedTailor}
            onChange={(e) => setAssignedTailor(e.target.value)}
          />
        </div>

        <div className="row">

          <div className="col">

            <label className="form-label">
              Total Amount
            </label>

            <input
              type="number"
              className="form-control"
              value={totalAmount}
              onChange={(e) => handleTotalChange(e.target.value)}
            />

          </div>

          <div className="col">

            <label className="form-label">
              Advance
            </label>

            <input
              type="number"
              className="form-control"
              value={advance}
              onChange={(e) => handleAdvanceChange(e.target.value)}
            />

          </div>

        </div>

        <div className="mt-3">

          <label className="form-label">
            Remaining
          </label>

          <input
            type="number"
            className="form-control"
            value={remaining}
            readOnly
          />

        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">

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