import EmptyState from './EmptyState'
import './OrderTable.css'

const tableColumns = [
  'Order ID',
  'Customer',
  'Garment Type',
  'Delivery Date',
  'Assigned Tailor',
  'Advance',
  'Remaining',
  'Status',
]

function OrderTable() {
  return (
    <div className="orders-table-card">
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
              <td colSpan={tableColumns.length} className="orders-table-empty-cell">
                <EmptyState
                  title="No orders found."
                  message='Click "New Order" to create your first order.'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable
