import { useState } from 'react'
import "../orders/NewOrderModal.css";
import EmptyState from '../orders/EmptyState'
import EditMeasurementModal from './EditMeasurementModal'
import DeleteMeasurementModal from './DeleteMeasurementModal'

import './MeasurementTable.css'

const columns = [
  'Customer',
  'Phone',
  'Garment',
  'Chest',
  'Waist',
  'Shoulder',
  'Sleeve',
  'Neck',
  'Length',
  'Actions',
]

function MeasurementTable({ measurements, refresh }) {
  const [selectedMeasurement, setSelectedMeasurement] = useState(null)
  const [deleteMeasurementData, setDeleteMeasurementData] = useState(null)
  const [viewNotes, setViewNotes] = useState(null);

  return (
    <div className="measurements-table-card">
      <table className="table align-middle mb-0">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {measurements.length === 0 ? (
            <tr>
              <td colSpan="10">
                <EmptyState
                  title="No measurements found."
                  message='Click "New Measurement" to create your first measurement.'
                />
              </td>
            </tr>
          ) : (
            measurements.map((measurement) => (
              <tr key={measurement.measurementId}>
                <td>{measurement.customerName}</td>
                <td>{measurement.phone}</td>
                <td>{measurement.garmentType}</td>
                <td>{measurement.chest || '-'}</td>
                <td>{measurement.waist || '-'}</td>
                <td>{measurement.shoulder || '-'}</td>
                <td>{measurement.sleeve || '-'}</td>
                <td>{measurement.neck || '-'}</td>
                <td>{measurement.length || '-'}</td>

                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => setSelectedMeasurement(measurement)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => setDeleteMeasurementData(measurement)}
                  >
                    Delete
                  </button>

                  <button
  className="btn btn-sm btn-outline-info"
  onClick={() => setViewNotes(measurement)}
>
  View Notes
</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedMeasurement && (
        <EditMeasurementModal
          measurement={selectedMeasurement}
          onClose={() => setSelectedMeasurement(null)}
          onUpdated={refresh}
        />
      )}

      {deleteMeasurementData && (
        <DeleteMeasurementModal
          measurement={deleteMeasurementData}
          onClose={() => setDeleteMeasurementData(null)}
          onDeleted={refresh}
        />
      )}
      {viewNotes && (
  <div className="modal-overlay">
    <div className="modal-card">

      <h2>Customer Notes</h2>

      <textarea
        className="form-control"
        rows="6"
        value={viewNotes.customerNotes || "No notes available."}
        readOnly
      />

      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => setViewNotes(null)}
        >
          Close
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  )
}

export default MeasurementTable