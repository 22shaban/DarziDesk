import { useState } from 'react'
import EditOrderModal from './EditOrderModal'
import EmptyState from './EmptyState'
import './OrderTable.css'
import { deleteOrder } from '../../services/ordersApi'
import DeleteOrderModal from './DeleteOrderModal'

const tableColumns = [
  'Order ID',
  'Customer',
  'Garment Type',
  'Delivery Date',
  'Assigned Tailor',
  'Advance',
  'Remaining',
  'Status',
  'Actions'
]


function OrderTable({orders, refresh}) {
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [deleteOrder, setDeleteOrder] = useState(null)


async function handleDelete(id){

const confirmDelete = window.confirm(
"Delete this order?"
)

if(!confirmDelete) return


try{

await deleteOrder(id)

refresh()

}
catch(error){

alert("Failed to delete order")

}

}


return (

<div className="orders-table-card">

<table className="table align-middle mb-0">

<thead>

<tr>

{tableColumns.map(column=>(

<th key={column}>
{column}
</th>

))}

</tr>

</thead>


<tbody>


{
orders.length === 0 ?

<tr>

<td colSpan="9">

<EmptyState
title="No orders found."
message='Click "New Order" to create your first order.'
/>

</td>

</tr>


:

orders.map(order=>(

<tr key={order.orderId}>


<td>
{order.orderId.slice(0,8)}...
</td>


<td>
{order.customerName}
</td>


<td>
{order.garmentType}
</td>


<td>-</td>

<td>-</td>

<td>-</td>

<td>-</td>


<td>
{order.status}
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
  onClick={() => setDeleteOrder(order)}
>
  Delete
</button>


</td>


</tr>


))

}


</tbody>


</table>

{selectedOrder && (
  <EditOrderModal
    order={selectedOrder}
    onClose={() => setSelectedOrder(null)}
    onUpdated={refresh}
  />
)}
{deleteOrder && (
  <DeleteOrderModal
    order={deleteOrder}
    onClose={() => setDeleteOrder(null)}
    onDeleted={refresh}
  />
)}
</div>

)

}


export default OrderTable