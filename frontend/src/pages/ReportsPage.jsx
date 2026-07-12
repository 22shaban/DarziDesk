import ReportCard from '../components/reports/ReportCard'
import ReportEmptyState from '../components/reports/ReportEmptyState'
import ReportFilters from '../components/reports/ReportFilters'
import './ReportsPage.css'

const summaryCards = ['Revenue', 'Orders', 'Customers', 'Inventory']

function ReportsPage() {
  return (
    <section className="reports-page">
      <div className="mb-4">
        <h1 className="mb-1">Reports</h1>
      </div>

      <ReportFilters />

      <div className="row g-3 mb-4">
        {summaryCards.map((title) => (
          <div key={title} className="col-3">
            <ReportCard title={title} />
          </div>
        ))}
      </div>

      <div className="reports-preview-card p-3">
        <div className="reports-preview-header mb-3">
          <h2 className="mb-0">Report Preview</h2>
        </div>
        <ReportEmptyState
          title="No reports generated yet."
          message='Select filters and click "Generate Report".'
        />
      </div>
    </section>
  )
}

export default ReportsPage
