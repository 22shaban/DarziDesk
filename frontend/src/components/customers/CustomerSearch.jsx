import { FiSearch } from 'react-icons/fi'
import './CustomerSearch.css'

function CustomerSearch({ placeholder = 'Customer name / phone search' }) {
  return (
    <div className="customers-search-bar input-group">
      <span className="input-group-text">
        <FiSearch />
      </span>
      <input type="text" className="form-control" placeholder={placeholder} aria-label={placeholder} />
    </div>
  )
}

export default CustomerSearch
