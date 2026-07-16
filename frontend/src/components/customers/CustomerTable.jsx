import { useState } from 'react'

import EmptyState from '../orders/EmptyState'
import EditCustomerModal from './EditCustomerModal'
import DeleteCustomerModal from './DeleteCustomerModal'

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
    <>
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
                  <td
                    colSpan={tableColumns.length}
                    className="orders-table-empty-cell"
                  >
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
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setDeleteCustomer(customer)}
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

      {selectedCustomer && (
        <EditCustomerModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onUpdated={() => {
            setSelectedCustomer(null)
            refresh()
          }}
        />
      )}

      {deleteCustomer && (
        <DeleteCustomerModal
          customer={deleteCustomer}
          onClose={() => setDeleteCustomer(null)}
          onDeleted={() => {
            setDeleteCustomer(null)
            refresh()
          }}
        />
      )}
    </>
  )
}

export default CustomerTable