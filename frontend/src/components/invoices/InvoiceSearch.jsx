import { FiSearch } from 'react-icons/fi'
import './InvoiceSearch.css'

function InvoiceSearch({ placeholder = 'Search Invoices' }) {
  return (
    <div className="invoice-search-bar input-group">
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

export default InvoiceSearch
