import { useState } from 'react'
import { createMeasurement } from '../../services/measurementsApi'
import './NewMeasurementModal.css'

function NewMeasurementModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    customerName: '',
    phone: '',
    garmentType: '',
    chest: '',
    waist: '',
    shoulder: '',
    sleeve: '',
    neck: '',
    length: '',
    customerNotes: "",
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSave() {
    try {
      await createMeasurement(form)

      alert('Measurement created successfully!')

      await onCreated()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to create measurement')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card measurement-modal">
        <h2>New Measurement</h2>

        <div className="row g-3">

          <div className="col-md-6">
            <label className="form-label">Customer Name</label>
            <input
              className="form-control"
              name="customerName"
              value={form.customerName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Phone</label>
            <input
              className="form-control"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Garment Type</label>
            <input
              className="form-control"
              name="garmentType"
              value={form.garmentType}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Chest</label>
            <input
              className="form-control"
              name="chest"
              value={form.chest}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Waist</label>
            <input
              className="form-control"
              name="waist"
              value={form.waist}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Shoulder</label>
            <input
              className="form-control"
              name="shoulder"
              value={form.shoulder}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Sleeve</label>
            <input
              className="form-control"
              name="sleeve"
              value={form.sleeve}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Neck</label>
            <input
              className="form-control"
              name="neck"
              value={form.neck}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Length</label>
            <input
              className="form-control"
              name="length"
              value={form.length}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
  <label className="form-label">
    Customer Notes
  </label>

  <textarea
    className="form-control"
    name="customerNotes"
    rows="4"
    value={form.customerNotes}
    onChange={handleChange}
    placeholder="Enter any special tailoring instructions..."
  />
</div>

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
            Save Measurement
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewMeasurementModal