import { FiSearch } from 'react-icons/fi'
import './SearchBar.css'

function SearchBar({
  placeholder = 'Search orders',
  value,
  onChange,
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
        aria-label={placeholder}
        value={value}
        onChange={onChange}
      />

    </div>
  )
}

export default SearchBar