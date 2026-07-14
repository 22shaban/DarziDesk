import { useState } from 'react'

import EmptyState from './EmptyState'
import EditOrderModal from './EditOrderModal'
import DeleteOrderModal from './DeleteOrderModal'

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
  'Actions',
]

function OrderTable({ orders, refresh }) {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [deleteModalOrder, setDeleteModalOrder] = useState(null)

  if (orders.length === 0) {
    return (
      <>
        <div className="orders-table-card">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                {tableColumns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td
                  colSpan={tableColumns.length}
                  className="orders-table-empty-cell"
                >
                  <EmptyState
                    title="No orders found."
                    message='Click "New Order" to create your first order.'
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    )
  }

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

              {orders.map((order) => (
                <tr key={order.orderId}>

                  <td>{order.orderId.slice(0, 8)}...</td>

                  <td>{order.customerName}</td>

                  <td>{order.garmentType}</td>

                  <td>
                    {order.deliveryDate || '-'}
                  </td>

                  <td>
                    {order.assignedTailor || '-'}
                  </td>

                  <td>
                    {order.advance ?? '-'}
                  </td>

                  <td>
                    {order.remaining ?? '-'}
                  </td>

                  <td>

                    <span
                      className={
                        order.status === 'Completed'
                          ? 'badge bg-success'
                          : 'badge bg-warning text-dark'
                      }
                    >
                      {order.status}
                    </span>

                  </td>

                  <td>

                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setDeleteModalOrder(order)}
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>

      {selectedOrder && (
        <EditOrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdated={refresh}
        />
      )}

      {deleteModalOrder && (
        <DeleteOrderModal
          order={deleteModalOrder}
          onClose={() => setDeleteModalOrder(null)}
          onDeleted={refresh}
        />
      )}
    </>
  )
}

export default OrderTable