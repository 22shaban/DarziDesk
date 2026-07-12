import { FiPlus } from 'react-icons/fi'
import MeasurementSearch from '../components/measurements/MeasurementSearch'
import MeasurementTable from '../components/measurements/MeasurementTable'
import './MeasurementsPage.css'

function MeasurementsPage() {
  return (
    <section className="measurements-page">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Measurements</h1>
        </div>

        <button type="button" className="btn measurements-new-btn">
          <FiPlus className="me-2" />
          New Measurement
        </button>
      </div>

      <div className="measurements-toolbar card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-6">
            <MeasurementSearch />
          </div>
        </div>
      </div>

      <MeasurementTable />

      <div className="row g-3 mt-4">
        <div className="col-3">
          <article className="measurement-placeholder-card p-3">
            <h2 className="mb-0">Shirt</h2>
          </article>
        </div>
        <div className="col-3">
          <article className="measurement-placeholder-card p-3">
            <h2 className="mb-0">Suit</h2>
          </article>
        </div>
        <div className="col-3">
          <article className="measurement-placeholder-card p-3">
            <h2 className="mb-0">Blazer</h2>
          </article>
        </div>
        <div className="col-3">
          <article className="measurement-placeholder-card p-3">
            <h2 className="mb-0">Kurta</h2>
          </article>
        </div>
      </div>

      <div className="measurements-pagination-placeholder mt-4">
        Pagination placeholder
      </div>
    </section>
  )
}

export default MeasurementsPage
