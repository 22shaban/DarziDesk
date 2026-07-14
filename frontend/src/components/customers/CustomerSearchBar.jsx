import { FiSearch } from 'react-icons/fi'
import './CustomerSearchBar.css'

function CustomerSearchBar({
  value,
  onChange,
  placeholder = 'Search customer, phone or email...',
}) {
  return (
    <div className="orders-search-bar input-group">
      <span className="input-group-text">
        <FiSearch />
      </span>

      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default CustomerSearchBar