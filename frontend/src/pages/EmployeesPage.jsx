import { FiPlus } from 'react-icons/fi'
import EmployeeSearch from '../components/employees/EmployeeSearch'
import EmployeeTable from '../components/employees/EmployeeTable'
import './EmployeesPage.css'

function EmployeesPage() {
  return (
    <section className="employees-page">
      <div className="d-flex align-items-center justify-content-between gap-3 mb-4">
        <div>
          <h1 className="mb-1">Employees</h1>
        </div>

        <button type="button" className="btn employees-add-btn">
          <FiPlus className="me-2" />
          Add Employee
        </button>
      </div>

      <div className="employees-toolbar card p-3 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-5">
            <EmployeeSearch />
          </div>

          <div className="col-3 ms-auto">
            <label className="form-label mb-2 employees-filter-label" htmlFor="roleFilter">
              Role
            </label>
            <select id="roleFilter" className="form-select employees-filter-select">
              <option>All Roles</option>
              <option>Master Tailor</option>
              <option>Helper</option>
              <option>Supervisor</option>
              <option>Admin</option>
            </select>
          </div>
        </div>
      </div>

      <EmployeeTable />

      <div className="row g-3 mt-4">
        <div className="col-3">
          <article className="employee-summary-card p-3">
            <h2 className="mb-1">Master Tailors</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="employee-summary-card p-3">
            <h2 className="mb-1">Helpers</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="employee-summary-card p-3">
            <h2 className="mb-1">Active Employees</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
        <div className="col-3">
          <article className="employee-summary-card p-3">
            <h2 className="mb-1">Pending Tasks</h2>
            <p className="mb-0">Placeholder summary</p>
          </article>
        </div>
      </div>

      <div className="employees-pagination-placeholder mt-4">
        Pagination placeholder
      </div>
    </section>
  )
}

export default EmployeesPage
