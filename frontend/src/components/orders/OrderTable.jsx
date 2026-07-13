import { useEffect, useState } from 'react'
import EmptyState from './EmptyState'
import { getOrders } from '../../services/ordersApi'
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

function OrderTable() { const [orders, setOrders] = useState([])

useEffect(() => {
  async function loadOrders() {
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  loadOrders()
}, [])
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
  {orders.length === 0 ? (
    <tr>
      <td colSpan={tableColumns.length} className="orders-table-empty-cell">
        <EmptyState
          title="No orders found."
          message='Click "New Order" to create your first order.'
        />
      </td>
    </tr>
  ) : (
    orders.map((order) => (
      <tr key={order.orderId}>
        <td>{order.orderId.slice(0, 8)}...</td>
        <td>{order.customerName}</td>
        <td>{order.garmentType}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>{order.status}</td>
      </tr>
    ))
  )}
</tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderTable
