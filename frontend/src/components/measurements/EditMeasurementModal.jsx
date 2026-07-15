import { useState } from 'react'
import { updateMeasurement } from '../../services/measurementsApi'
import './NewMeasurementModal.css'

function EditMeasurementModal({
  measurement,
  onClose,
  onUpdated,
}) {
  const [form, setForm] = useState({
    customerName: measurement.customerName,
    phone: measurement.phone,
    garmentType: measurement.garmentType,
    chest: measurement.chest,
    waist: measurement.waist,
    shoulder: measurement.shoulder,
    sleeve: measurement.sleeve,
    neck: measurement.neck,
    length: measurement.length,
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function handleUpdate() {
    try {
      await updateMeasurement(
        measurement.measurementId,
        form,
      )

      alert('Measurement updated successfully!')

      await onUpdated()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to update measurement')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card measurement-modal">
        <h2>Edit Measurement</h2>

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
            onClick={handleUpdate}
          >
            Update Measurement
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditMeasurementModal