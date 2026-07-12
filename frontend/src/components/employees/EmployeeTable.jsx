import EmployeeEmptyState from './EmployeeEmptyState'
import './EmployeeTable.css'

const tableColumns = [
  'Employee Name',
  'Role',
  'Phone',
  'Status',
  'Assigned Orders',
  'Actions',
]

function EmployeeTable() {
  return (
    <div className="employee-table-card">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              {tableColumns.map((column) => (
                <th key={column} scope="col">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={tableColumns.length} className="employee-table-empty-cell">
                <EmployeeEmptyState
                  title="No employees found."
                  message='Click "Add Employee" to add your first employee.'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeTable
