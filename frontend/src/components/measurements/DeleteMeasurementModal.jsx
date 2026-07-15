import { deleteMeasurement } from '../../services/measurementsApi'
import './NewMeasurementModal.css'

function DeleteMeasurementModal({
  measurement,
  onClose,
  onDeleted,
}) {
  async function handleDelete() {
    try {
      await deleteMeasurement(measurement.measurementId)

      alert('Measurement deleted successfully!')

      await onDeleted()

      onClose()
    } catch (error) {
      console.error(error)
      alert('Failed to delete measurement')
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Delete Measurement</h2>

        <p>
          Are you sure you want to delete
          <strong> {measurement.customerName}</strong>'s
          measurement?
        </p>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteMeasurementModal