import { FiPlus } from 'react-icons/fi'
import CustomerCard from '../components/customers/CustomerCard'
import CustomerSearch from '../components/customers/CustomerSearch'
import CustomerTable from '../components/customers/CustomerTable'
import './CustomersPage.css'

function CustomersPage() {
  return (
    <section className="customers-page">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Customers</h1>
        </div>

        <button type="button" className="btn customers-add-btn">
          <FiPlus className="me-2" />
          New Customer
        </button>
      </div>

      <div className="customers-toolbar card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-6">
            <CustomerSearch />
          </div>
        </div>
      </div>

      <CustomerTable />

      <div className="row g-3 mt-4">
        <div className="col-3">
          <CustomerCard title="Customer Details">
            <div className="placeholder-line w-75" />
            <div className="placeholder-line w-50" />
            <div className="placeholder-line w-100" />
          </CustomerCard>
        </div>
        <div className="col-3">
          <CustomerCard title="Measurements">
            <div className="placeholder-line w-75" />
            <div className="placeholder-line w-50" />
            <div className="placeholder-line w-100" />
          </CustomerCard>
        </div>
        <div className="col-3">
          <CustomerCard title="Customer Preferences">
            <div className="placeholder-line w-75" />
            <div className="placeholder-line w-50" />
            <div className="placeholder-line w-100" />
          </CustomerCard>
        </div>
        <div className="col-3">
          <CustomerCard title="Customer History">
            <div className="placeholder-line w-75" />
            <div className="placeholder-line w-50" />
            <div className="placeholder-line w-100" />
          </CustomerCard>
        </div>
      </div>

      <div className="customers-pagination-placeholder mt-4">
        Pagination placeholder
      </div>
    </section>
  )
}

export default CustomersPage
