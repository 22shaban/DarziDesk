import { FiSearch } from 'react-icons/fi'
import './EmployeeSearch.css'

function EmployeeSearch({ placeholder = 'Search Employees' }) {
  return (
    <div className="employee-search-bar input-group">
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

export default EmployeeSearch
