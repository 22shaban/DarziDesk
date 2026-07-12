import { FiSearch } from 'react-icons/fi'
import './InventorySearch.css'

function InventorySearch({ placeholder = 'Search Fabric & Inventory' }) {
  return (
    <div className="inventory-search-bar input-group">
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

export default InventorySearch
