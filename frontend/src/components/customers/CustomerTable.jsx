import EmptyState from './EmptyState'
import './CustomerTable.css'

const tableColumns = [
  'Customer ID',
  'Name',
  'Phone',
  'Email',
  'Total Orders',
  'Last Order',
]

function CustomerTable() {
  return (
    <div className="customers-table-card">
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
              <td colSpan={tableColumns.length} className="customers-table-empty-cell">
                <EmptyState
                  title="No customers found."
                  message='Click "Add Customer" to create your first customer.'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CustomerTable
