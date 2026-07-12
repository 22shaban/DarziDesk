import { FiSearch } from 'react-icons/fi'
import './MeasurementSearch.css'

function MeasurementSearch({ placeholder = 'Search Measurements' }) {
  return (
    <div className="measurements-search-bar input-group">
      <span className="input-group-text">
        <FiSearch />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  )
}

export default MeasurementSearch
