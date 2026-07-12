import { FiCalendar, FiPlus } from 'react-icons/fi'
import './ReportFilters.css'

function ReportFilters() {
  return (
    <div className="report-filters-card card p-3 mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-4">
          <label className="form-label mb-2 report-filter-label" htmlFor="dateRangePicker">
            Date Range
          </label>
          <button type="button" id="dateRangePicker" className="form-control report-date-placeholder">
            <FiCalendar className="me-2" />
            Select date range
          </button>
        </div>

        <div className="col-3">
          <label className="form-label mb-2 report-filter-label" htmlFor="reportType">
            Report Type
          </label>
          <select id="reportType" className="form-select report-filter-select">
            <option>All Types</option>
            <option>Revenue</option>
            <option>Orders</option>
            <option>Customers</option>
            <option>Inventory</option>
          </select>
        </div>

        <div className="col-3 ms-auto text-end">
          <button type="button" className="btn report-generate-btn">
            <FiPlus className="me-2" />
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReportFilters
