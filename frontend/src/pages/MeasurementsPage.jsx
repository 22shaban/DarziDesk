import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { getMeasurements } from '../services/measurementsApi'

import MeasurementTable from '../components/measurements/MeasurementTable'
import NewMeasurementModal from '../components/measurements/NewMeasurementModal'

import './MeasurementsPage.css'

function MeasurementsPage() {
  const [measurements, setMeasurements] = useState([])
  const [showModal, setShowModal] = useState(false)

  async function loadMeasurements() {
    try {
      const data = await getMeasurements()
      setMeasurements(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadMeasurements()
  }, [])

  return (
    <section className="measurements-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>Measurements</h1>

          <p className="mb-0">
            Manage customer body measurements.
          </p>
        </div>

        <button
          className="btn measurements-new-btn"
          onClick={() => setShowModal(true)}
        >
          <FiPlus className="me-2" />
          New Measurement
        </button>
      </div>

      <MeasurementTable
        measurements={measurements}
        refresh={loadMeasurements}
      />

      <div className="orders-pagination-placeholder mt-4">
        Page 1 of 1
      </div>

      {showModal && (
        <NewMeasurementModal
          onClose={() => setShowModal(false)}
          onCreated={loadMeasurements}
        />
      )}
    </section>
  )
}

export default MeasurementsPage