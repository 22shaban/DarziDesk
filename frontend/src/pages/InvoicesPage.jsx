import { FiPlus } from 'react-icons/fi'
import InvoiceSearch from '../components/invoices/InvoiceSearch'
import InvoiceTable from '../components/invoices/InvoiceTable'
import './InvoicesPage.css'

function InvoicesPage() {
  return (
    <section className="invoices-page">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Invoices</h1>
        </div>

        <button type="button" className="btn invoices-create-btn">
          <FiPlus className="me-2" />
          Create Invoice
        </button>
      </div>

      <div className="invoices-toolbar card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-5">
            <InvoiceSearch />
          </div>

          <div className="col-3 ms-auto">
            <label className="form-label mb-2 invoices-filter-label" htmlFor="statusFilter">
              Status
            </label>
            <select id="statusFilter" className="form-select invoices-filter-select">
              <option>All Statuses</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </div>
      </div>

      <InvoiceTable />

      <div className="row g-3 mt-4">
        <div className="col-3">
          <article className="invoice-summary-card p-3">
            <h2 className="mb-1">Total Invoices</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="invoice-summary-card p-3">
            <h2 className="mb-1">Paid</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="invoice-summary-card p-3">
            <h2 className="mb-1">Pending</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="invoice-summary-card p-3">
            <h2 className="mb-1">Overdue</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
      </div>

      <div className="invoices-pagination-placeholder mt-4">
        Pagination placeholder
      </div>
    </section>
  )
}

export default InvoicesPage
