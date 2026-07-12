import InvoiceEmptyState from './InvoiceEmptyState'
import './InvoiceTable.css'

const tableColumns = ['Invoice No', 'Customer', 'Amount', 'Payment Status', 'Due Date', 'Actions']

function InvoiceTable() {
  return (
    <div className="invoice-table-card">
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
              <td colSpan={tableColumns.length} className="invoice-table-empty-cell">
                <InvoiceEmptyState
                  title="No invoices yet."
                  message='Click "Create Invoice" to generate your first invoice.'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvoiceTable
