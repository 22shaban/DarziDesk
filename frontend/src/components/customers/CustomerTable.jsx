import { useState } from 'react'
import EmptyState from '../orders/EmptyState'



import './CustomerTable.css'

const tableColumns = [
  'Customer ID',
  'Customer Name',
  'Phone',
  'Email',
  'Address',
  'Actions',
]

function CustomerTable({ customers, refresh }) {
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [deleteCustomer, setDeleteCustomer] = useState(null)

  return (
    <div className="orders-table-card">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              {tableColumns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="6" className="orders-table-empty-cell">
                  <EmptyState
                    title="No customers found."
                    message='Click "Add Customer" to create your first customer.'
                  />
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr key={customer.customerId}>
                  <td>{customer.customerId.slice(0, 8)}...</td>

                  <td>{customer.customerName}</td>

                  <td>{customer.phone}</td>

                  <td>{customer.email}</td>

                  <td>{customer.address}</td>

                <td>
  <button
    className="btn btn-sm btn-outline-primary me-2"
    disabled
  >
    Edit
  </button>

  <button
    className="btn btn-sm btn-outline-danger"
    disabled
  >
    Delete
  </button>
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  )
}

export default CustomerTable